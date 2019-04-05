const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/items/";
const sequelize = require("../../src/db/models/index").sequelize;
const Item = require("../../src/db/models").Item;


describe("routes : items", () => {

  beforeEach((done) => {
    this.item;
    
    sequelize.sync({
      force: true
    }).then((res) => {

      Item.create({
          title: "Eggs",
          purchased: false
         
        })
        .then((item) => {
          this.item = item;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });

    });

  });


  describe("GET /items", () => {

    it("should return all status code of 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });
  }); //end spec

     describe("GET /items/:id", () => {

      it("should render a view of selected item", (done) => {
        request.get(`${base}${this.item.id}`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Eggs");
          done();
        });
      });

    }); //end get new 

  describe("POST /items/create", () => {

    const options = {
      url: `${base}create`,
      form: {
        title: "Immortal IPA",
        purchased: false
      }
    };
    it("should create a new item and redirect", (done) => {

      request.post(options,

        (err, res, body) => {
          Item.findOne({
              where: {
                title: "Immortal IPA"
              }
            })
            .then((item) => {
              expect(res.statusCode).toBe(303);
              expect(item.title).toBe("Immortal IPA");
              expect(item.purchased).toBe(false);
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
        });
    });
  });
   //end post-create
   describe("GET /items/:id/edit", () => {

    it("should render a view with an edit item form", (done) => {
      request.get(`${base}${this.item.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Item");
        expect(body).toContain("Eggs");
        done();
      });
    });

  }); // end edit

  describe("POST /items/:id/destroy", () => {

    it("should delete the item with the associated ID", (done) => {


      Item.all()
        .then((items) => {

          const itemCountBeforeDelete = items.length;

          expect(itemCountBeforeDelete).toBe(1);
          request.post(`${base}${this.item.id}/destroy`, (err, res, body) => {
            Item.all()
              .then((items) => {
                expect(err).toBeNull();
                expect(items.length).toBe(itemCountBeforeDelete - 1);
                done();
              })
           
              });
          });
        });

    });

 
 }) //end destroy
