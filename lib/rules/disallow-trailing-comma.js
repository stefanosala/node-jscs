/**
 * Disallows an extra comma following the final element of an array or object literal.
 *
 * Type: `Boolean`
 *
 * Values: `true`
 *
 * JSHint: [`es3`](http://jshint.com/docs/options/#es3)
 *
 * #### Example
 *
 * ```js
 * "disallowTrailingComma": true
 * ```
 *
 * ##### Valid
 *
 * ```js
 * var foo = [1, 2, 3];
 * var bar = {a: "a", b: "b"}
 * ```
 *
 * ##### Invalid
 *
 * ```js
 * var foo = [1, 2, 3, ];
 * var bar = {a: "a", b: "b", }
 * ```
 */

var assert = require('assert');

module.exports = function() {};

module.exports.prototype = {
    configure: function(disallowTrailingComma) {
        assert(
            typeof disallowTrailingComma === 'boolean',
            'disallowTrailingComma option requires boolean value'
        );
        assert(
            disallowTrailingComma === true,
            'disallowTrailingComma option requires true value or should be removed'
        );
    },

    getOptionName: function() {
        return 'disallowTrailingComma';
    },

    check: function(file, errors) {
        file.iterateNodesByType(['ObjectExpression', 'ArrayExpression'], function(node) {
            var closingToken = file.getLastNodeToken(node);

            errors.assert.noTokenBefore({
                token: closingToken,
                expectedTokenBefore: {type: 'Punctuator', value: ','},
                message: 'Extra comma following the final element of an array or object literal'
            });
        });
    }

};
