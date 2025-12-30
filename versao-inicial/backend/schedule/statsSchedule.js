const schedule = require('node-schedule');

module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function () {
        const usersCount = await app.db('users').count('id').first();
        const categoriesCount = await app.db('categories').count('id').first();
        const articlesCount = await app.db('articles').count('id').first();


        const { Stat } = app.api.stat;

        const lastStat = await Stat.findOne({}, {}, {
            sort: { 'createdAt': -1 }
        })

        const stat = new Stat({
            users: usersCount.count,
            categories: categoriesCount.count,
            articles: articlesCount.count,
            createdAt: new Date()
        })

        const changesUsers = !lastStat || stat.users !== lastStat.users
        const changesCategories = !lastStat || stat.categories !== lastStat.categories
        const changesArticles = !lastStat || stat.articles !== lastStat.articles


        if (changesUsers || changesCategories || changesArticles) {
            stat.save().then(() => console.log('[Stats] Estatísticas atualizadas!'))
        }
    })
}