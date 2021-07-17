const mongoose = require('mongoose');

module.exports = app => {

    let IssueScheme = new mongoose.Schema({
        project: {
            type: String,
            required: true,
            select: false
        },
        issue_title: {
            type: String,
            required: true
        },
        issue_text: {
            type: String,
            required: true
        },
        created_by: {
            type: String,
            required: true
        },
        assigned_to: {
            type: String,
            default: ''
        },
        status_text: {
            type: String,
            default: ''
        },
        open: {
            type: Boolean,
            default: true
        },
        creted_on: String,
        updated_on: String
    });

    IssueScheme.pre("save", next => {
        if (!this.creatd_on) {
            this.creatd_on = new Date().toISOString();
        }
        this.updated_on = new Date().toISOString();
        next();
    });

    var Issue = mongoose.model("test", IssueScheme);

    function required(issue, requiredFields) {
        let errors = [];

        requiredFields.forEach(field => {
            if (!issue[field]) {
                errors.push(field);
            }
        });

        if (errors.length) {
            return "Missing required fieldss: " + errors.join(", ");
        };

        function populate(source, fields, obj = {}) {
            fields.forEach(field => {
                if (source[field]) {
                    obj[field] = source[field];
                }
            });
            return obj;
        }
    }
}