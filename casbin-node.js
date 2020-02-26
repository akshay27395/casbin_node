module.exports = function (RED) {

    var casbin = require("casbin");
    var path = require('path');
    const MongooseAdapter = require('casbin-mongoose-adapter')
    var validate = require("validate-fields")()

    function casbinNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', function (msg) {
            msg.payload = msg.payload;

            var schema = {
                configPath: String,
                sub: String,
                object: String,
                action: String,
                method: String,
                isDB: Boolean
            }

            if (validate(schema, msg.payload)) {
                if (msg.payload.isDB) {
                    MongooseAdapter.newAdapter(msg.payload.mongoURL).then(function (adapter) {

                        casbin.newEnforcer(msg.payload.configPath, adapter).then(function (e) {

                            let sub = msg.payload.sub; // the user that wants to access a resource.
                            let obj = msg.payload.object; // the resource that is going to be accessed.
                            let act = msg.payload.action; // the operation that the user performs on the resource.
                            let method = msg.payload.method

                            e.enforce(sub, obj, act, method).then(function (isAllowed) {
                                // console.log("success res for new user =  ", isAllowed)
                                if (isAllowed) {
                                    msg.payload.isAllowed = isAllowed
                                    node.send(msg);
                                } else {
                                    msg.payload.isAllowed = isAllowed;
                                    node.send(msg)
                                }
                            })
                        }).catch(function (error) {
                            msg.payload.error = error
                            node.send(msg)
                        })
                    }).catch(function (err) {
                        msg.payload.error = err
                        node.send(msg)
                    })
                } else {

                    casbin.newEnforcer(msg.payload.configPath, msg.payload.policyPath).then(function (e) {

                        let sub = msg.payload.sub; // the user that wants to access a resource.
                        let obj = msg.payload.object; // the resource that is going to be accessed.
                        let act = msg.payload.action; // the operation that the user performs on the resource.
                        let method = msg.payload.method

                        e.enforce(sub, obj, act, method).then(function (isAllowed) {
                            // console.log("success res for new user =  ", isAllowed)
                            if (isAllowed) {
                                msg.payload.isAllowed = isAllowed
                                node.send(msg);
                            } else {
                                msg.payload.isAllowed = isAllowed;
                                node.send(msg)
                            }
                        })
                    }).catch(function (error) {
                        msg.payload.error = error
                        node.send(msg)
                    })
                }

            } else {
                msg.payload.error = validate.lastError
                node.send(msg)
            }

        });
    }
    RED.nodes.registerType("casbin-node", casbinNode);
}