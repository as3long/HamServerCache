import hamserver from 'hamserver';
import mongoose from 'mongoose';
import escapeStringRegexp from 'escape-string-regexp';

import config from '../../config.mjs';
mongoose.connect(config.mongodb, {useNewUrlParser: true, useUnifiedTopology: true});
const Cache = mongoose.model(config.model, { 
    key: String, 
    value: String, 
    expiration: String, 
    updated: { type: Date, default: Date.now } 
});

export default class CacheService extends hamserver.BaseController {
  async Add(ctx) {
    let err,query
    // console.log(ctx.req);
    const {key, value, expiration} = ctx.req;
    query = await Cache.updateOne({ key }, {
        key,
        value,
        expiration,
        updated: Date.now()
    });
    // console.log('第一次', query);
    if (query.n === 0) {
        query = await Cache.create({
            key,
            value,
            expiration
        });
    }
    // console.log('第二次', query);
    return {
      key,
      value,
      expiration
    };
  }

  async Get(ctx) {
    let err, doc;
    const { key } = ctx.req;
    doc = await Cache.findOne({ key });
    // console.log(doc);
    if (!doc) {
        return {
            key: 'none key',
            value: '',
            expiration: ''
        };
    }
    return {
        key: doc.key,
        value: doc.value,
        expiration: doc.expiration
    };
  }

  async GetByPrefix(ctx) {
    let err, docs;
    const { key } = ctx.req;
    // console.log(key);
    const esrKey = '^' + escapeStringRegexp(key);
    const regexp = new RegExp(esrKey);
    docs = await Cache.find({
        key: regexp
    });
    // console.log(docs);
    return {
        items: docs
    }
  }

  async GetAllItems(ctx) {
    let err, docs;
    docs = await Cache.find();
    // console.log(docs);
    return {
        items: docs
    };
  }

  async DeleteKey(ctx) {
    let err, doc;
    const { key } = ctx.req;
    doc = await Cache.deleteOne({ key });
    // console.log(doc)
    return {
        success: doc.n === 1
    };
  }

  async DeleteAll(ctx) {
    const query = await Cache.deleteMany({});
    // console.log(query)
    return {
        success: query.ok === 1 && query.n > 0
    }
  }
}