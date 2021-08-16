---
sidebar_position: 2
---

# Relations

Adding relations is like stealing candy from a baby

Assuming we have models `parent`, `baby`, `candy` and `thief`, we can do the following

```ts
parent.hasOne(baby)
baby.hasMany(candy)
candy.belongsTo(thief)
```

:::note
Currently `belongsToMany` is not supported, but we need your support in order to implement it. Tell us why you need it by contacting us at we.are.collaboroo@gmail.com
:::

And all your APIs will be automatically generated for you.

:::warning
The order of what is on the left and right affects the way your API is generated.
:::

For example
```ts
//Parent has foreign key for baby
parent.hasOne(baby)

//Baby has foreign key for parent
baby.belongsTo(parent)
```

:::warning
In the first example
1. We *can* get the baby from the parent `GET` endpoint
2. We *cannot* get the parent from the baby `GET` endpoint

In the second example
1. We *cannot* get the baby from the parent `GET` endpoint
2. We *can* get the parent from the baby `GET` endpoint
:::

You can view more details from the [sequelize docs](https://sequelize.org/master/manual/assocs.html#:~:text=the%20order%20in%20which%20the%20association%20is%20defined%20is%20relevant.%20in%20other%20words%2C%20the%20order%20matters%2C%20for%20the%20four%20cases.%20in%20all%20examples%20above%2C%20a%20is%20called%20the%20source%20model%20and%20b%20is%20called%20the%20target%20model.%20this%20terminology%20is%20important.)




