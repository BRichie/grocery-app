const Item = require("./models").Item;

module.exports = {

    getAllItems(callback) {
        return Item.all()
            .then((items) => {
                callback(null, items);
            })
            .catch((err) => {
                callback(err);
            })
    }, //end getAll

    addItem(newItem, callback) {
        return Item.create({
                title: newItem.title,
                purchased: newItem.purchased
            })
            .then((item) => {
                callback(null, item);
            })
            .catch(err => {
                callback(err);
            });
    }, //end addItem

    getItem(id, callback) {
        return Item.findById(id)
            .then((item) => {
                callback(null, item);
            })
            .catch((err) => {
                callback(err);
            })
    },

    deleteItem(id, callback) {
        return Item.destroy({
                where: {
                    id
                }
            })
            .then((item) => {
                callback(null, item);
            })
            .catch((err) => {
                callback(err);
            })

    }, //end delete

    updateItem(req, updatedItem, callback) {
        return Item.findById(req.params.id)
            .then((item) => {
                if (!item) {
                    return callback("Item on Side of Milk Carton");
                }

                item.update(updatedItem, {
                        fields: Object.keys(updatedItem)
                    })
                    .then(() => {
                        callback(null, item);
                    })
                    .catch((err) => {
                        callback(err);
                    });
            });
    } // end update
}