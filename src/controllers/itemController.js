const itemQueries = require("../db/queries.items.js");
const express = require("express");
const router = express.Router();
const Item = require("../db/models").Item;
const helper = require('../auth/helpers');

module.exports = {

    index(req, res, next) {

        itemQueries.getAllItems((err, items) => {
            if (err) {
                res.redirect(500, "static/index");
            } else {
                res.render("items", {
                    items
                });
            }
        })
    }, //end index

    new(req, res, next) {
        res.render("items/new");

    }, //end new

    create(req, res, next) {

        let newItem = {
            title: req.body.title,
            purchased: req.body.purchased
        };
        itemQueries.addItem(newItem, (err, item) => {
            if (err) {
                res.redirect(500, "/items/new");
            } else {
                res.redirect(303, `/items`);
            }
        });
    }, // end create

    show(req, res, next) {
        itemQueries.getItem(req.params.id, (err, item) => {

            if (err || item == null) {
                res.redirect(404, "/");
            } else {
                res.render("items/show", {
                    item
                });
            }
        });
    }, //end show

    destroy(req, res, next) {
        itemQueries.deleteItem(req.params.id, (err, item) => {
            if (err) {
                res.redirect(500, `/items/${item.id}`)
            } else {
                res.redirect(303, "/items")
            }
        });
    }, //end destroy

    edit(req, res, next) {
        itemQueries.getItem(req.params.id, (err, item) => {
            if (err || item == null) {
                res.redirect(404, "/");
            } else {
                res.render("items/edit", {
                    item
                });
            }
        });
    }, //end edit

    update(req, res, next) {

        itemQueries.updateItem(req, req.body, (err, item) => {

            if (err || item == null) {
                res.redirect(401, `/items/${req.params.id}/edit`);
            } else {
                res.redirect(`/items`);
            }
        });
    }

}