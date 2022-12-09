import * as React from "react";
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg";

function NewListingClicked(props) {
  return (
    <Svg
      width={153}
      height={43}
      viewBox="0 0 153 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        width={153}
        height={43}
        rx={21.5}
        fill="url(#paint0_linear_12970_40360)"
      />
      <Path
        d="M34 18.128V14.07a1.57 1.57 0 00-1.57-1.57H17.57A1.57 1.57 0 0016 14.07v4.058m18 0v10.158c0 .859-.69 1.558-1.55 1.57l-4.22.052h-6l-4.622.113A1.57 1.57 0 0116 28.453V18.128m18 0l-1.301.424a1.57 1.57 0 01-1.428-.238l-1.314-.986a1.962 1.962 0 00-2.155-.132l-1.761 1.01a1.962 1.962 0 01-2.047-.056l-1.477-.961a1.962 1.962 0 00-2.005-.08l-2.417 1.31a1.57 1.57 0 01-1.436.03L16 18.13"
        stroke="#fff"
        strokeWidth={1.427}
      />
      <Path
        d="M27.887 25.32v4.466h-5.773V25.32a2.887 2.887 0 015.773 0z"
        stroke="#fff"
        strokeWidth={1.427}
      />
      <Path
        d="M48.054 27a.37.37 0 01-.272-.112.37.37 0 01-.112-.272V16.2a.39.39 0 01.112-.288.37.37 0 01.272-.112h1.232c.15 0 .256.037.32.112a.88.88 0 01.144.144l4.608 7.168V16.2c0-.117.032-.213.096-.288a.39.39 0 01.288-.112h1.344a.39.39 0 01.288.112.39.39 0 01.112.288v10.4a.39.39 0 01-.112.288.37.37 0 01-.272.112h-1.248c-.15 0-.256-.037-.32-.112a.872.872 0 00-.144-.144l-4.592-7.008v6.88a.37.37 0 01-.112.272.39.39 0 01-.288.112h-1.344zm14.32.16c-1.184 0-2.122-.341-2.816-1.024-.693-.683-1.066-1.653-1.12-2.912a4.128 4.128 0 01-.016-.4c0-.17.006-.304.016-.4.043-.8.224-1.493.544-2.08A3.365 3.365 0 0160.342 19c.576-.32 1.254-.48 2.032-.48.864 0 1.59.181 2.176.544.587.352 1.03.848 1.328 1.488.299.63.448 1.36.448 2.192v.336a.37.37 0 01-.112.272.39.39 0 01-.288.112h-5.312v.128c.011.373.08.72.208 1.04.139.31.336.56.592.752.267.192.582.288.944.288.299 0 .55-.043.752-.128a2.048 2.048 0 00.768-.608c.096-.128.171-.203.224-.224a.621.621 0 01.272-.048h1.376c.107 0 .192.032.256.096a.262.262 0 01.096.24c-.01.17-.101.379-.272.624-.16.245-.394.485-.704.72-.309.235-.698.432-1.168.592-.458.15-.986.224-1.584.224zm-1.76-5.04h3.536v-.048c0-.416-.069-.779-.208-1.088a1.72 1.72 0 00-.608-.736c-.266-.181-.586-.272-.96-.272-.373 0-.693.09-.96.272-.266.181-.469.427-.608.736-.128.31-.192.672-.192 1.088v.048zM70.062 27c-.149 0-.261-.037-.336-.112a.97.97 0 01-.192-.288l-2.288-7.424a.738.738 0 01-.016-.144c0-.096.032-.176.096-.24a.336.336 0 01.24-.112h1.184a.41.41 0 01.304.112c.075.064.118.128.128.192l1.568 5.296 1.664-5.248a.531.531 0 01.144-.224c.075-.085.187-.128.336-.128h.8c.15 0 .262.043.336.128.075.075.123.15.144.224l1.664 5.248 1.568-5.296a.363.363 0 01.112-.192.41.41 0 01.304-.112h1.184c.096 0 .176.037.24.112a.303.303 0 01.112.24c0 .043-.01.09-.032.144L77.038 26.6a.573.573 0 01-.176.288c-.074.075-.186.112-.336.112h-1.04a.516.516 0 01-.352-.112.573.573 0 01-.176-.288l-1.664-5.056L71.63 26.6a.687.687 0 01-.192.288c-.074.075-.192.112-.352.112h-1.024zm14.726 0a.37.37 0 01-.272-.112.37.37 0 01-.112-.272V16.184a.37.37 0 01.112-.272.37.37 0 01.272-.112h1.488a.37.37 0 01.272.112.37.37 0 01.112.272v8.912h5.072a.39.39 0 01.288.112.39.39 0 01.112.288v1.12a.37.37 0 01-.112.272.39.39 0 01-.288.112h-6.944zm9.09 0a.37.37 0 01-.272-.112.37.37 0 01-.112-.272v-7.552a.37.37 0 01.112-.272.37.37 0 01.272-.112h1.328c.117 0 .207.037.272.112a.37.37 0 01.112.272v7.552a.37.37 0 01-.112.272.339.339 0 01-.272.112h-1.329zm-.064-9.696a.427.427 0 01-.288-.096.427.427 0 01-.096-.288v-1.152c0-.107.031-.197.095-.272a.39.39 0 01.288-.112h1.456a.39.39 0 01.288.112.37.37 0 01.112.272v1.152a.39.39 0 01-.111.288.427.427 0 01-.289.096h-1.456zm7.238 9.856c-.64 0-1.19-.075-1.648-.224-.448-.15-.816-.336-1.104-.56-.288-.224-.502-.448-.64-.672-.139-.224-.214-.41-.224-.56-.01-.117.021-.208.096-.272a.407.407 0 01.272-.112h1.264c.042 0 .08.005.112.016a.39.39 0 01.128.096l.432.368c.16.128.346.24.56.336.213.085.48.128.8.128.416 0 .762-.08 1.04-.24.288-.17.432-.41.432-.72a.77.77 0 00-.192-.544c-.118-.139-.342-.261-.672-.368-.331-.117-.8-.24-1.408-.368-.598-.139-1.094-.315-1.488-.528-.395-.213-.688-.48-.88-.8a2.135 2.135 0 01-.288-1.12c0-.416.122-.81.368-1.184.256-.384.63-.699 1.12-.944.501-.245 1.12-.368 1.856-.368.576 0 1.077.075 1.504.224.426.139.778.315 1.056.528.288.213.506.432.656.656.149.213.229.4.24.56a.347.347 0 01-.096.288.383.383 0 01-.256.096h-1.184a.314.314 0 01-.144-.032.792.792 0 01-.128-.08 16.696 16.696 0 00-.384-.336 1.987 1.987 0 00-.512-.304c-.192-.096-.448-.144-.768-.144-.406 0-.715.09-.928.272a.803.803 0 00-.32.656c0 .181.048.341.144.48.106.128.314.25.624.368.309.117.778.24 1.408.368.714.128 1.28.32 1.696.576.426.245.725.533.896.864.181.32.272.677.272 1.072 0 .48-.144.912-.432 1.296-.278.384-.694.688-1.248.912-.544.213-1.222.32-2.032.32zm9.092-.16c-.64 0-1.179-.112-1.616-.336a2.145 2.145 0 01-.976-.992c-.213-.448-.32-1.003-.32-1.664v-3.632h-1.264a.37.37 0 01-.272-.112.369.369 0 01-.112-.272v-.928c0-.107.037-.197.112-.272a.37.37 0 01.272-.112h1.264v-2.656c0-.107.032-.197.096-.272a.39.39 0 01.288-.112h1.296a.37.37 0 01.272.112.369.369 0 01.112.272v2.656h2a.37.37 0 01.272.112.369.369 0 01.112.272v.928a.369.369 0 01-.112.272.37.37 0 01-.272.112h-2v3.472c0 .437.075.779.224 1.024.16.245.432.368.816.368h1.104a.37.37 0 01.272.112.369.369 0 01.112.272v.992a.369.369 0 01-.112.272.37.37 0 01-.272.112h-1.296zm3.484 0a.369.369 0 01-.272-.112.37.37 0 01-.113-.272v-7.552a.37.37 0 01.113-.272.369.369 0 01.272-.112h1.328a.34.34 0 01.272.112.373.373 0 01.112.272v7.552a.373.373 0 01-.112.272.34.34 0 01-.272.112h-1.328zm-.064-9.696a.425.425 0 01-.288-.096.427.427 0 01-.096-.288v-1.152c0-.107.032-.197.096-.272a.388.388 0 01.288-.112h1.456a.39.39 0 01.288.112.373.373 0 01.112.272v1.152a.393.393 0 01-.112.288.428.428 0 01-.288.096h-1.456zm4.61 9.696a.372.372 0 01-.272-.112.373.373 0 01-.112-.272v-7.552c0-.107.038-.197.112-.272a.372.372 0 01.272-.112h1.312c.107 0 .198.037.272.112a.369.369 0 01.112.272v.656c.278-.341.63-.624 1.056-.848.438-.235.976-.352 1.616-.352.651 0 1.216.15 1.696.448.48.288.848.699 1.104 1.232.267.533.4 1.173.4 1.92v4.496a.369.369 0 01-.112.272.369.369 0 01-.272.112h-1.408a.372.372 0 01-.272-.112.373.373 0 01-.112-.272v-4.4c0-.619-.154-1.104-.464-1.456-.298-.352-.736-.528-1.312-.528-.554 0-.997.176-1.328.528-.33.352-.496.837-.496 1.456v4.4a.369.369 0 01-.112.272.369.369 0 01-.272.112h-1.408zm13.361 3.52c-.779 0-1.419-.101-1.92-.304-.502-.203-.896-.448-1.184-.736-.288-.288-.496-.576-.624-.864-.118-.277-.182-.496-.192-.656a.364.364 0 01.096-.288.425.425 0 01.288-.112h1.392c.106 0 .192.021.256.064a.594.594 0 01.16.272c.064.139.149.288.256.448.106.16.266.293.48.4.224.117.528.176.912.176.405 0 .746-.059 1.024-.176.277-.117.485-.315.624-.592.149-.277.224-.661.224-1.152v-1.088c-.256.31-.587.56-.992.752-.395.192-.886.288-1.472.288-.576 0-1.072-.09-1.488-.272a2.944 2.944 0 01-1.04-.784 3.676 3.676 0 01-.64-1.2 6.018 6.018 0 01-.24-1.52 11.315 11.315 0 010-.864c.021-.533.101-1.03.24-1.488a3.45 3.45 0 01.624-1.2c.288-.352.64-.624 1.056-.816.416-.192.912-.288 1.488-.288.608 0 1.12.117 1.536.352.416.224.757.507 1.024.848v-.64c0-.117.037-.213.112-.288a.369.369 0 01.272-.112h1.296c.106 0 .197.037.272.112.074.075.112.17.112.288l.016 7.712c0 .768-.144 1.43-.432 1.984a2.935 2.935 0 01-1.312 1.28c-.576.31-1.318.464-2.224.464zm-.08-5.264c.437 0 .789-.096 1.056-.288a1.72 1.72 0 00.592-.752 2.99 2.99 0 00.224-.944c.01-.139.016-.315.016-.528 0-.213-.006-.384-.016-.512a2.86 2.86 0 00-.224-.944 1.72 1.72 0 00-.592-.752c-.267-.203-.619-.304-1.056-.304-.438 0-.79.101-1.056.304a1.598 1.598 0 00-.576.768c-.107.32-.171.672-.192 1.056a4.664 4.664 0 000 .784c.021.373.085.725.192 1.056.117.32.309.576.576.768.266.192.618.288 1.056.288z"
        fill="#fff"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_12970_40360"
          x1={138.288}
          y1={-11.5769}
          x2={24.2582}
          y2={64.0735}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#DF9856" />
          <Stop offset={0.489583} stopColor="#DE6CD3" />
          <Stop offset={0.942708} stopColor="#AD68E3" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default NewListingClicked;
