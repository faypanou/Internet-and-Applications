'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
    cord_uid: String,
    sha: String,
    source_x: String,
    title: String,
    doi: String,
    pmcid: String,
    pubmed_id: String,
    license: String,
    abstract: String,
    publish_time: String,
    authors: String,
    journal: String,
    mag_id: String,
    who_covidence_id: String,
    arxiv_id: String,
    pdf_json_files: String,
    pmc_json_files:String,
    url: String,
    s2_id: String,
});

module.exports = mongoose.model('Tasks', TaskSchema, 'articles');