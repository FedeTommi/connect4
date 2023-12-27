declare module '*.svg'{
    import * as React from 'react'
    // const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    // export default content;
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}