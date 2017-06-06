import justificationStyle from './styles/jc';
import indentationStyle from './styles/ind';
import spacingStyle from './styles/spacing';
import tableCellSpacingStyle from './styles/table-cell-spacing';
import tableWidthStyle from './styles/tblw';
import tableLayoutStyle from './styles/table-layout';
import tableIndentStyle from './styles/tblind';
import borderStyle from './styles/border';
import shadingStyle from './styles/shd';
import highlightStyle from './styles/highlight';
import rFontsStyle from './styles/r-fonts';
import framePrStyle from './styles/frame-pr';
import boldStyle from './styles/b';
import italicStyle from './styles/i';
import vanishStyle from './styles/vanish';
import textDecorationStyle from './styles/text-decoration';
import uppercaseStyle from './styles/uppercase';
import textColorStyle from './styles/color';
import textShadowStyle from './styles/text-shadow';
import textSizeStyle from './styles/sz';
import textAlignmentStyle from './styles/text-alignment';

export interface TagStyleMatchProps {
    tagName: string;
    attributes: {[key: string]: string;};
    styles: string;
}

export default function matchStyleTag ({tagName, attributes, styles}: TagStyleMatchProps): string {
    switch (tagName) {
        case 'w:spacing':
            return spacingStyle(styles, attributes);
        case 'w:tblLayout':
            return tableLayoutStyle(styles, attributes);
        case 'w:tblW':
            return tableWidthStyle(styles, attributes);
        case 'w:tblCellSpacing':
            return tableCellSpacingStyle(styles, attributes);
        case 'w:tblInd':
            return tableIndentStyle(styles, attributes);
        case 'w:shd':
            return shadingStyle(styles, attributes);
        case 'w:textAlignment':
            return textAlignmentStyle(styles, attributes);
        case 'w:vertAlign':
            return textAlignmentStyle(styles, attributes);
        case 'w:jc':
            return justificationStyle(styles, attributes);
        case 'w:top':
        case 'w:bottom':
        case 'w:left':
        case 'w:right':
            return borderStyle(styles, attributes, tagName);
        case 'w:ind':
            return indentationStyle(styles, attributes);
        case 'w:framePr':
            return framePrStyle(styles, attributes);
        case 'w:b':
            return boldStyle(styles);
        case 'w:i':
            return italicStyle(styles, attributes);
        case 'w:vanish':
            return vanishStyle(styles, attributes);
        case 'w:rFonts':
            return rFontsStyle(styles, attributes);
        case 'w:highlight':
            return highlightStyle(styles, attributes);
        case 'w:color':
            return textColorStyle(styles, attributes);
        case 'w:dstrike':
        case 'w:strike':
        case 'w:u':
            return textDecorationStyle(styles, attributes, tagName);
        case 'w:caps':
        case 'w:smallCaps':
            return uppercaseStyle(styles, attributes);
        case 'w:emboss':
        case 'w:imprint':
        case 'w:shadow':
            return textShadowStyle(styles, attributes, tagName);
        case 'w:sz':
            return textSizeStyle(styles, attributes);
        default:
            //
    }

    return styles;
}