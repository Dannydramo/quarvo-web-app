import * as React from 'react';
import { SVGProps } from 'react';
const Eye = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path
            fill="currentColor"
            d="M12 9a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0 9.821 9.821 0 0 0-17.64 0Z"
        />
    </svg>
);
export default Eye;
