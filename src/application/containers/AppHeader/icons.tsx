import * as React from 'react';
import { appColors } from '@theme/properties/new/appColors';

/* tslint:disable */
const path1 = `M21.174 57.246c-.146.104-.313.209-.48.334l-.501.377a1.43 1.43 0 0 0-.355.438.682.682 0 0 0-.063.502c0 .042.02.063.02.105 0 .041.022.062.022.083 0 .021.02.063.041.084.021.02.021.063.042.083l-.313.502a2.3 2.3 0 0 1-.292.439c-.1.126-.23.226-.376.293-.172.07-.357.106-.543.104a2.185 2.185 0 0 1-.627-.104 2.901 2.901 0 0 1-.584-.251 4.857 4.857 0 0 1-.543-.356 5.081 5.081 0 0 1-.522-.418l-.063-.188c0-.02-.02-.041-.02-.062a2.141 2.141 0 0 0-.21-.44c-.083-.125-.208-.25-.313-.376l-.376-.313a2.764 2.764 0 0 0-.417-.25v.083c0 .02.02.042.02.083 0 .042.021.042.021.084s.021.063.021.084c0 .02.021.062.021.083.151.421.355.821.606 1.192.248.352.543.668.877.94.324.269.682.494 1.065.669.376.168.779.267 1.19.292.399.025.798-.04 1.17-.188.367-.154.69-.399.94-.71a2.7 2.7 0 0 0 .563-1.15c.112-.487.119-.993.02-1.484l-.041-.564M4.761 36.701l-.125.063-.126.062a.436.436 0 0 0-.125.084c-.042.02-.083.063-.125.084-.23.146-.439.313-.647.46a4.512 4.512 0 0 0-.564.522c-.182.204-.35.42-.501.648a4.3 4.3 0 0 0-.439.878 3.789 3.789 0 0 1 1.19 0c.423.062.836.174 1.232.334.439.182.858.406 1.253.669.443.294.861.623 1.253.982l-1.67-4.974c-.042.02-.105.02-.147.042-.041.02-.104.02-.146.041-.042.021-.104.042-.146.063a.323.323 0 0 0-.167.042M6.118 36.43l1.65 4.827 3.654.063a13.88 13.88 0 0 0-1.232-2.07 9.82 9.82 0 0 0-1.336-1.525 6.116 6.116 0 0 0-1.378-.961 3.923 3.923 0 0 0-1.358-.335M8.29 42.804c.6.721 1.152 1.482 1.65 2.278a29.935 29.935 0 0 1 1.566 2.842 38.802 38.802 0 0 1 1.42 3.365 41.714 41.714 0 0 1 1.21 3.846c.022-.585.043-1.191.022-1.797-.021-.606-.042-1.233-.105-1.86-.062-.628-.125-1.275-.208-1.902a33.798 33.798 0 0 0-.335-1.923 22.792 22.792 0 0 0-.292-1.275 20.523 20.523 0 0 0-.334-1.212c-.125-.398-.23-.774-.355-1.15-.125-.376-.271-.731-.397-1.066l-3.842-.146M0 7.19c.104 1.003.23 2.006.355 3.01.125 1.003.271 2.048.439 3.093.167 1.045.334 2.09.5 3.156.168 1.065.377 2.131.585 3.218.279 1.421.571 2.8.877 4.138.314 1.359.627 2.676.96 3.972.335 1.295.67 2.55 1.045 3.762.376 1.212.73 2.403 1.107 3.553.166-.025.333-.039.5-.042.169.003.336.017.502.042.171.022.34.064.501.125.17.06.338.13.501.209-.375-.899-.751-1.84-1.127-2.8a96.571 96.571 0 0 1-1.086-2.948c-.355-1.003-.69-2.027-1.023-3.072-.334-1.045-.668-2.11-.982-3.198a116.105 116.105 0 0 1-1.148-4.222c-.355-1.4-.69-2.758-.982-4.117a171.346 171.346 0 0 1-.814-4.013C.397 9.74.188 8.465 0 7.19M32.617 27.84l-.647.125c-.209.041-.418.104-.647.146-.23.042-.418.104-.627.167-.209.063-.418.126-.626.21l-.69 6.144a23.96 23.96 0 0 1 2.172-2.195 27.109 27.109 0 0 1 2.297-1.86 20.866 20.866 0 0 1 2.402-1.505 24.332 24.332 0 0 1 2.484-1.17 9.39 9.39 0 0 0-1.44-.314c-.478-.06-.96-.087-1.441-.083-.503.005-1.005.04-1.504.104-.522.063-1.065.147-1.65.23h-.083M27.376 37.16l-8.896 4.432c-.13.494-.227.997-.292 1.504A18.405 18.405 0 0 0 18 44.643a13.1 13.1 0 0 0-.042 1.568c0 .522.042 1.066.084 1.588a16.811 16.811 0 0 0 1.086 4.494c.27.692.59 1.362.96 2.006.363.626.767 1.227 1.211 1.797.037-1.822.211-3.638.522-5.434a35.264 35.264 0 0 1 1.274-5.016 33.661 33.661 0 0 1 4.28-8.485`;

const path2 = `M24.682 0c.292 1.108.522 2.257.731 3.449.209 1.19.334 2.445.439 3.74.104 1.297.187 2.676.25 4.076.063 1.4.084 2.905.104 4.431a42.335 42.335 0 0 1-.668 8.8 26.395 26.395 0 0 1-1.92 6.04 46.462 46.462 0 0 1-2.36 4.305c-.773 1.317-1.441 2.529-1.859 3.97-.02.043-.02.064-.042.105-.02.042-.041.063-.041.105a.16.16 0 0 1-.042.104c-.021.021-.021.084-.042.105l8.415-4.055a76.75 76.75 0 0 0 .856-7.587 76.38 76.38 0 0 0 .147-6.437 82.3 82.3 0 0 0-.314-5.434c-.146-1.672-.375-3.156-.605-4.514a64.907 64.907 0 0 0-.585-3.031 58.192 58.192 0 0 0-.71-2.884A46.62 46.62 0 0 0 24.682 0`;

const path3 = `M59.659 45.96c-5.743 0-8.332-2.884-8.332-6.626l.292-.292h3.446l.292.292c0 2.007 1.149 3.156 4.594 3.156 2.59 0 4.03-.857 4.03-2.591 0-2.007-1.148-2.592-5.178-3.156-4.03-.565-7.184-2.007-7.184-6.04 0-2.885 2.297-5.476 7.768-5.476s7.768 2.591 7.768 6.04l-.292.292h-3.445l-.293-.292c0-1.735-.856-2.592-4.03-2.592-2.59 0-3.445.857-3.445 2.007 0 1.734 1.148 2.299 5.178 2.884s7.184 2.299 7.184 6.333c-.021 3.177-2.318 6.06-8.353 6.06z`;

const path4 = `M77.763 45.96c-2.589 0-3.737-1.442-3.737-1.442h-.293v6.625l-.292.293h-3.446l-.292-.293V31.58l.292-.292h3.153l.293.292.292.857h.293s1.148-1.442 3.737-1.442c3.446 0 6.327 2.884 6.327 7.482 0 4.599-2.881 7.483-6.327 7.483zm-.856-11.516c-2.297 0-3.153 1.734-3.153 4.033 0 2.3.856 4.034 3.153 4.034s3.153-1.734 3.153-4.034c0-2.299-.856-4.033-3.153-4.033z`;

const path5 = `M95.012 34.736h-2.005c-2.297 0-3.153 1.15-3.153 3.741v6.898l-.293.292h-3.445l-.292-.292V31.559l.292-.292h3.153l.292.292.293.857h.292s.585-1.15 3.153-1.15h1.733l.293.293v2.885l-.313.292zM105.64 45.96c-1.148 2.884-2.297 4.598-6.327 4.598h-1.44l-.293-.293v-2.884l.292-.293h1.441c1.441 0 1.733-.292 2.005-1.15v-.27l-4.594-11.224v-2.885l.292-.292h2.59l.292.292 3.445 9.782h.293l3.445-9.782.293-.292h2.589l.292.292v2.885L105.64 45.96zM124.33 45.667h-1.734l-.584-.292-4.01-4.306h-.292l-1.733 1.735-.293.585v2.006l-.271.272h-3.445l-.293-.292V25.812l.293-.293h3.445l.292.293v11.516h.293l5.742-5.748.585-.292h1.733l.292.292v2.885l-3.445 3.448v.293l3.738 4.305v2.884z`;

const path6 = `M139.26 39.627l-.292.293h-8.917l-.292.292c0 .585.584 2.3 2.881 2.3.857 0 1.734-.293 2.005-.858l.292-.292h3.446l.292.292c-.292 1.735-1.733 4.306-6.035 4.306-4.886 0-7.183-3.449-7.183-7.483 0-4.033 2.297-7.482 6.891-7.482 4.594 0 6.891 3.449 6.891 7.482v1.15h.02zm-4.302-2.884c0-.293-.292-2.3-2.59-2.3-2.296 0-2.588 2.007-2.588 2.3l.292.292h4.594l.292-.292z`;

const path7 = `M150.473 34.736h-2.004c-2.297 0-3.153 1.15-3.153 3.741v6.898l-.293.292h-3.445l-.293-.292V31.559l.293-.292h3.153l.292.292.293.857h.292s.585-1.15 3.153-1.15h1.733l.293.293v2.885l-.314.292z`;

const path8 = `M121.197 64.645l-.146.146h-1.399l-.146-.146-.773-2.007-.313-.146h-3.863l-.313.146-.773 2.007-.146.146h-1.4l-.145-.146v-1.547l3.57-8.987.147-.146h2.004l.146.146 3.571 8.987-.02 1.547zm-3.257-4.18l-1.4-3.72h-.146l-1.399 3.72.147.146h2.63l.168-.146zM130.698 54.78c.669.564 1.024 1.358 1.024 2.424 0 1.066-.335 1.86-1.024 2.425-.689.564-1.587.836-2.693.836h-2.945l-.146.146v4.034l-.146.146h-1.858l-.147-.146V54.11l.147-.146h5.116c1.106-.021 2.004.271 2.672.815zm-1.545 3.511c.272-.209.397-.564.397-1.087 0-.522-.125-.878-.397-1.087a1.832 1.832 0 0 0-1.148-.313h-2.945l-.146.146v2.487l.146.147h2.945c.405.042.812-.062 1.148-.293z`;

const path9 = `M135.439 64.645l-.147.146h-1.858l-.146-.146V54.11l.146-.146h1.858l.147.146z`;

const path10 = `M142.142 63.85c-.648-.731-.982-1.713-.982-2.926 0-1.212.334-2.173.982-2.926a3.131 3.131 0 0 1 2.422-1.107 3.19 3.19 0 0 1 1.127.188c.262.082.504.217.71.397l.188.188h.146V54.09l.147-.146h1.858l.146.146v10.534l-.146.146h-1.712l-.146-.146-.147-.46h-.146a.97.97 0 0 1-.208.209c-.209.138-.433.25-.669.334a2.921 2.921 0 0 1-1.127.21 2.97 2.97 0 0 1-2.443-1.067zm2.881-5.1c-1.127 0-1.712.732-1.712 2.174 0 1.443.564 2.174 1.712 2.174 1.149 0 1.712-.731 1.712-2.174 0-1.442-.563-2.173-1.712-2.173zM157.72 60.924v.627l-.147.147h-4.803l-.146.146a1.3 1.3 0 0 0 .376.815c.25.293.647.44 1.17.44.563 0 .918-.147 1.085-.46l.146-.147h1.859l.146.146c-.045.262-.13.516-.25.753a3.396 3.396 0 0 1-.543.752c-.279.272-.614.48-.982.606-.47.16-.965.237-1.462.23-1.253 0-2.213-.376-2.881-1.15a4.256 4.256 0 0 1-1.003-2.884c0-1.15.314-2.11.96-2.884.648-.773 1.567-1.15 2.757-1.15 1.19 0 2.11.377 2.757 1.15.647.773.96 1.714.96 2.863zm-2.465-.773l.146-.146a2.196 2.196 0 0 0-.041-.272 1.365 1.365 0 0 0-.188-.418.915.915 0 0 0-.439-.397 1.573 1.573 0 0 0-.73-.167 1.51 1.51 0 0 0-.732.167 1.028 1.028 0 0 0-.438.397 3.318 3.318 0 0 0-.188.418 1.74 1.74 0 0 0-.042.272l.146.146h2.506z`;

const path11 = `M170.875 64.645l-.146.146h-1.859l-.146-.146V60.15c0-.92-.418-1.4-1.232-1.4-.919 0-1.4.564-1.4 1.714v4.18l-.145.146h-1.88l-.146-.146V60.15c0-.92-.418-1.4-1.232-1.4-.919 0-1.399.564-1.399 1.714v4.18l-.146.146h-1.88l-.146-.146v-7.44l.147-.147h1.712l.146.146.146.46h.146c0-.02.021-.042.063-.084a.754.754 0 0 1 .188-.188c.107-.093.226-.17.355-.23.175-.079.357-.142.543-.188a2.7 2.7 0 0 1 .73-.083c.961 0 1.692.355 2.172 1.086h.147c.03-.04.058-.081.083-.125.072-.095.156-.18.25-.25a2.422 2.422 0 0 1 1.107-.607c.292-.085.594-.128.898-.125.94 0 1.67.271 2.172.794.501.522.773 1.296.773 2.299v4.682h-.021z`;

const path12 = `M178.81 57.977c.71.732 1.065 1.714 1.065 2.927 0 1.212-.355 2.215-1.065 2.926-.71.71-1.65 1.086-2.82 1.086-1.169 0-2.108-.355-2.818-1.086-.71-.732-1.065-1.714-1.065-2.926 0-1.213.355-2.216 1.065-2.927.71-.71 1.65-1.086 2.819-1.086 1.17 0 2.109.355 2.819 1.086zm-1.566 4.557c.292-.376.438-.92.438-1.61 0-.69-.146-1.233-.438-1.609a1.67 1.67 0 0 0-2.506 0c-.293.376-.439.92-.439 1.61 0 .69.146 1.233.439 1.609a1.67 1.67 0 0 0 2.506 0z`;

const path13 = `M82.295 54.174c2.046 0 3.215 1.212 3.215 2.842a2.328 2.328 0 0 1-1.524 2.257c1.023.251 1.859 1.192 1.859 2.508 0 1.714-1.274 2.947-3.258 2.947h-3.675a.397.397 0 0 1-.397-.397v-9.823a.33.33 0 0 1 .334-.334h3.446zm-.314 4.368c.94 0 1.504-.523 1.504-1.317 0-.794-.522-1.317-1.524-1.317h-1.42v2.634h1.44zm.21 4.493c1.002 0 1.586-.522 1.586-1.38 0-.856-.543-1.42-1.566-1.42h-1.67v2.78h1.65v.02z`;

const path14 = `M87.39 58.228a.382.382 0 0 1-.376-.334 2.531 2.531 0 0 1-.021-.397c0-1.86 1.4-3.532 3.863-3.532 2.36 0 3.8 1.567 3.8 3.406 0 1.359-.751 2.467-2.046 3.282l-2.025 1.233c-.4.215-.722.551-.92.961h4.804a.255.255 0 0 1 .25.251v1.338a.33.33 0 0 1-.334.334H86.91c.02-1.86.605-3.365 2.484-4.514l1.734-1.045c.898-.544 1.253-1.087 1.253-1.819 0-.773-.543-1.442-1.587-1.442-1.128 0-1.671.773-1.671 1.756a1.38 1.38 0 0 0 .02.292.266.266 0 0 1-.25.293l-1.503-.063zM95.805 59.482c0-3.365 2.548-5.517 5.388-5.517 2.652 0 4.134 1.463 4.698 3.03a.498.498 0 0 1-.292.627l-1.149.355a.35.35 0 0 1-.438-.209c-.335-.92-1.17-1.818-2.799-1.818-1.587 0-3.257 1.129-3.257 3.532 0 2.258 1.587 3.49 3.278 3.49 1.65 0 2.527-.982 2.882-1.901a.3.3 0 0 1 .355-.188l1.4.418a.242.242 0 0 1 .166.334c-.501 1.568-2.005 3.323-4.803 3.323-2.986.021-5.429-2.11-5.429-5.476z`;

/* tslint:enable */
export const SprykerLogoBlack: React.SFC = (props): JSX.Element => (
    <svg version="1.1" width="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 65">
        <g fillRule="evenodd">
            <path fill={appColors.black} d={ path1 } />
            <path fill={appColors.black} d={ path2 } opacity=".7" />
            <path fill={appColors.black} d={ path3 } />
            <path fill={appColors.black} fillRule="nonzero" d={ path4 } />
            <path fill={appColors.black} d={ path5 } />
            <path fill={appColors.black} fillRule="nonzero" d={ path6 } />
            <path fill={appColors.black} d={ path7 } />
            <g fill={appColors.weekRed}>
                <path fillRule="nonzero" d={ path8 } />
                <path d={ path9 } />
                <path fillRule="nonzero" d={ path10 } />
                <path d={ path11 } />
                <path fillRule="nonzero" d={ path12 } />
            </g>
            <path fill={appColors.weekRed} fillRule="nonzero" d={ path13 } />
            <path fill={appColors.weekRed} d={ path14 } />
        </g>
    </svg>
);
