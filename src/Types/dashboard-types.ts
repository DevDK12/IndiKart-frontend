

export type TStatsPercent = {
    revenue : number,
    orders : number,
    users : number,
    products : number
}


export type TCategory = {
    name : string,
    count : number
}


export type TCategoriesStats = {
    list: TCategory[],
    total: number,
}


export type TLatestTransactions = {
    _id : string,
    id : string,
    discount : number,
    total : number,
    status : string,
    items : number
}



export type TDashboardStats = {
    changePercent: TStatsPercent,
    count: TStatsPercent,
    chart: {
        lastSixMonthsOrders: number[],
        lastSixMonthsRevenue: number[]
    },
    // categories: TStatsCategories[],
    categories: TCategoriesStats,
    userRatio: {
        male : number,
        female : number
    },
    latestTransactions : TLatestTransactions[]
}

export type TOrderFullfilment = {
    processing : number,
    shipped : number,
    delivered : number,
    cancelled : number,
}


export type TRevenueDist = {
    netMargin : number,
    discount : number,
    productionCost : number,
    burnt : number,
    marketingCost : number,
}



export type TPieChart = {
    orderFullfilment: TOrderFullfilment,
    categories: TCategory[],
    stockAvailablity : {
        inStock: number,
        outOfStock: number
    },
    revenueDistribution : TRevenueDist,
    usersAgeGroup: {
        teen : number,
        adult : number,
        old : number
    },
    adminCustomer: {
        admin : number,
        customer : number,
    }
}


export type TBarChart = {
    products : number[],
    users: number[],
    orders: number[],
}


export type TLineChart = {
    users: number[],
    products : number[],
    discount : number[],
    revenue : number[],
}