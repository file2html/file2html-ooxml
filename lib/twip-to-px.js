"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description Convert TWINS to PX
 *  1inch = 96px
 *  1inch = 1440twins
 *  1px = 1440 / 96 = 15twins
 * @param {string} value
 * @returns {number}
 */
function convertTwipToPx(value) {
    return Math.floor(Number(value) / 15);
}
exports.default = convertTwipToPx;
