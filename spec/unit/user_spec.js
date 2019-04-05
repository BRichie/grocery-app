const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("User", () => {

    beforeEach((done) => {
        sequelize.sync({
                force: true
            })
            .then(() => {
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
    });

    describe("#create()", () => {

        it("should create a user with a valid username, email and password", (done) => {
            User.create({
                    email: "x@example.com",

                })
                .then((user) => {
                    expect(user.email).toBe("x@example.com");
                    expect(user.id).toBe(1);
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });

        it("should NOT create a user with invalid username, email or password", (done) => {
            User.create({

                    email: "karl",
                    password: "1234567890"
                })
                .then((user) => {
                    done();
                })
                .catch((err) => {
                    expect(err.message).toContain("Validation error: Must be a valid Email");
                    done();
                });
        });

        it("should not create a user with an email already taken", (done) => {
            User.create({

                    email: "repeat@gmail.com",
                    password: "LALakers"
                })
                .then((user) => {
                    User.create({

                            email: "repeat@gmail.com",
                            password: "fiverings"
                        })
                        .then((user) => {

                            done();
                        })
                        .catch((err) => {
                            expect(err.message).toContain("Validation error");

                            done();
                        });

                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });
    });

});