const { Transform } = require('stream');
const cipher = require('./cipher.js');

class FileTransform extends Transform {
    constructor(shift, action) {
        super();
        this.shift = shift;
        this.action = action;
    }
    _transform(chunk, encoding, done) {
        try {
            if (this.action && this.shift) {
                this.push(cipher(chunk, this.shift, this.action), encoding);
                done();
            } else {
                if (!this.action) {
                    throw 'Action is undefined in transformer.'
                }
                if (!this.shift) {
                    throw 'Shift number is undefined in transformer.'
                }
            }
        } catch (err) {
            done(err);
        }
    }
    _flush(done) {
        this.push('\n');
        done();
    }
};

module.exports = FileTransform;