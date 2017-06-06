/**
 * @description 3pt = 4px
 * @type {number}
 */
const pixelsInPoint: number = 4 / 3;

/**
 * @description Convert PT to PX
 * @param {string} value
 * @param {number} [pointsDivider]
 * @returns {number}
 */
export default function convertPtToPx (value: string, pointsDivider?: number): number {
    return Math.floor(Number(value) / (pointsDivider || 1) * pixelsInPoint);
}