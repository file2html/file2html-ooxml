"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description 3pt = 4px
 * @type {number}
 */
var pixelsInPoint = 4 / 3;
/**
 * @description Convert PT to PX
 * @param {string} value
 * @param {number} [pointsDivider]
 * @returns {number}
 */
function convertPtToPx(value, pointsDivider) {
    return Math.floor(Number(value) / (pointsDivider || 1) * pixelsInPoint);
}
exports.default = convertPtToPx;
