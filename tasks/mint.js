
const { ethers } = require("hardhat");
const hre = require("hardhat");

//const existingContractAddr = "0x2D112eC0CA73d709Fb7583Ed494E849703cC2e97"; // replace this with Loyalty NFT contract address

async function main() {
    //const nft = await hre.ethers.getContractAt("LoyaltyNFTs", existingContractAddr);
    let imageURL = "https://upload.wikimedia.org/wikipedia/sco/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1017px-Starbucks_Corporation_Logo_2011.svg.png";
    let status = "Gold";
    const loyalUser = "0xD3b8407c3CdB9b7A0cB7A34bA828676E28964F9a";

    const LoyaltyNFTs = await hre.ethers.getContractFactory("LoyaltyNFTs");
    let nft = await LoyaltyNFTs.deploy("StarBucks Loyalty", "SBUCKS");
    await nft.deployed();

    console.log("LoyaltyNFTs deployed to:", nft.address);

    let svgObj = `<svg version="1.1"
    id="svg3003" sodipodi:docname="Starbucks_Corporation_Logo_2011.svg" inkscape:version="0.48.0 r9654" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="297.474px" height="299px"
    viewBox="1.263 0.5 297.474 299" enable-background="new 1.263 0.5 297.474 299" xml:space="preserve">
<title  id="title3036">Starbucks Corporation
Logo</title>
<sodipodi:namedview  id="namedview3015" inkscape:current-layer="svg3003" inkscape:window-y="-8" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-height="750" inkscape:window-width="1280" inkscape:window-x="-8" inkscape:window-maximized="1" inkscape:cy="219.77498" inkscape:cx="108.82718" inkscape:zoom="2.3162919" showgrid="false" borderopacity="1" pagecolor="#ffffff" guidetolerance="10" bordercolor="#666666" gridtolerance="10" objecttolerance="10">
   </sodipodi:namedview>
<g id="text3021" transform="matrix(2.7809611,0,0,2.7809611,-616.7962,-1116.1732)">
</g>
<g id="g4387">
   <path id="path3040" fill="#FFFFFF" d="M298.736,150c0,82.567-66.592,149.5-148.736,149.5C67.855,299.5,1.263,232.568,1.263,150
       C1.263,67.434,67.855,0.5,150,0.5C232.145,0.5,298.736,67.434,298.736,150z"/>
   <g id="g4381">
       <path id="inner_artwork" inkscape:connector-curvature="0" fill="#007042" d="M148.758,53.65
           c5.236,3.018,10.79,6.902,15.018,11.018l-1.661,1.669c-8.343-0.887-17.13,0.22-25.039,0.342c-0.882-0.89-2.659-2.228-1.004-3.346
           L148.758,53.65L148.758,53.65z M296.279,157.287c0.111,3.766,0.465,7-1.004,10.854c-15.242,4.335-25.254-11.803-40.043-9.369
           l1.672,8.365c13.682,0.45,22.228,13.57,36.363,13.006c-2.008,4.011,0.896,14.578-8.001,10.354
           c-9.235-2.219-15.912-10.354-26.032-10.354c-1.221,2.242-0.448,5.346-0.662,7.998c10.676,1.675,18.354,10.698,29.027,12.364
           c-1.004,3.668-1.999,7.775-5.005,10.012c-8.683-2.113-15.465-9.911-24.709-9.688l-1.646,7.681
           c8.785,0.226,14.461,7.998,22.356,10.331c0.217,3.24-2.679,6.135-4.347,9.027c-7.009-2.105-12.354-8.126-20.362-7.682
           c-0.111-3.017,1.68-6.443,1.004-9.669c-8.994,2.675-15.025-5.682-21.691-10.695c-0.192-16.405-17.462-27.167-18.374-42.535
           c-0.175-3.064,0.292-6.335,1.688-9.85c5.676-13.124,3.893-30.163-2.331-42.399c-1.891-3.22-5.242-5.762-8.365-7.655
           c4.569,9.683,10.137,21.124,7.358,33.026c-0.322,9.191-5.745,18.018-5.807,26.878c-0.021,3.159,0.653,6.318,2.47,9.508
           c7.236,13.032,20.254,25.368,15.359,41.712c-1.346,5.02-5.354,8.902-6.354,14.011c8.465,7.011,16.469,14.911,27.701,15.356
           c4.002-2.556,1.779-13.891,10.012-8.663l12.021,6.013c-0.876,3.218-3.57,6.102-6.01,8.318c-4.561-2.22-9.01-4.881-14.697-4.664
           c-1.677,1.779-3.12,3.776-2.992,6.329c4.002,0.659,7.673,2.348,11.016,4.688c-1.552,3.343-4.577,5.438-7.358,7.998l-9.325-3.334
           c-1.557,2.228-4.791,4.569-3.656,7.014c2.104,0.901,4.438,2.119,5.987,3.68c-4.116,4.449-9.333,7.311-14.353,10.331
           c-4.324-14.133-18.571-24.042-17.348-40.386l-0.662-0.661c-3.349,3.765-2.23,9.786-2.014,14.672
           c4.008,10.237,13.568,18.144,15.018,29.37c-1.674,2.889-5.448,3.465-8.343,4.688c0.336-20.24-30.365-35.591-10.677-56.064
           c6.566-10.025,17.567-19.592,13.669-33.394c-4.002-13.326-18.157-21.583-18.032-36.522l0.022-1.165
           c3.224-15.579,13.018-32.156,5.006-48.729c-2.233-6.666-7.222-14.241-14.008-17.027c10.117,11.58,14.128,30.474,8.34,46.056
           c-2.917,6.198-6.933,13.582-7.336,20.868h-0.024c-0.215,3.805,0.562,7.589,3.017,11.177c7.682,12.464,21.024,26.155,13.349,42.398
           c-8.676,13.01-23.805,26.244-15.356,43.38c6.118,10.234,15.582,20.446,13.029,33.027l-10.012,3.334
           c6.675-23.466-26.035-37.254-12.342-60.728c8.454-12.57,23.574-24.364,15.015-41.047c-5.117-10.337-15.69-16.455-15.356-29.373
           l0.364-2.169c3.445-18.321,17.372-35.663,7.634-55.241c-2.559-5.781-7.673-11.675-13.349-15.015l-0.343,0.343
           c11.353,11.013,14.807,29.133,8.686,43.699c-2.856,8.546-9.124,17.059-10.398,26.217c-0.606,4.318-0.095,8.793,2.4,13.507
           c7.23,11.449,19.909,23.594,11.997,38.396c-8.332,12.226-22.242,24.122-16.686,40.021c6.12,13.91,18.899,27.161,11.999,44.409
           l-10.331,2.333c8.229-16.809-4.11-33.488-11.338-48.066c-8.793-20.915,18.892-30.93,19.336-50.052
           c-0.105-12.342-13.226-19.35-15.999-30.696c-5.679-4.791-11.565,1.905-18.354,0.662c-5.012,1.007-12.71-6.899-15.702,1.671
           c-3.563,12.564-19.795,21.801-12.661,36.703c6.788,13.243,23.124,22.927,17.667,40.065c-4.886,16.008-21.026,31.25-11.016,49.713
           c-4.112-1.332-11.791,1.218-11.68-5.351c-6.338-22.359,20.69-35.385,12.342-57.732c-3.885-13.688-21.586-21.25-17.689-37.713
           c2.881-13.552,18.088-23.026,15.955-37.871c-0.173-1.243-0.479-2.515-0.916-3.841c-5.676-16.019-17.256-32.042-10.354-50.738
           c1.895-5.34,5.68-9.9,9.006-14.673c-11.014,5.894-16.57,18.357-16.342,31.036c-0.48,13.788,9.705,25.599,11.154,38.216
           c0.57,5.092-0.264,10.306-3.818,15.837c-7.225,9.804-16.674,20.141-12.342,33.05c4.119,13.021,20.359,20.909,19.358,36.044
           c-0.11,17.903-20.913,29.05-15.017,49.072l-10.354-3.359c-4.111-17.792,14.797-26.895,15.014-43.357
           c2.676-18.931-21.469-25.955-20.02-44.409c-0.104-14.021,12.238-22.901,17.689-34.695c0.935-2.87,1.246-5.582,1.121-8.182
           c-0.668-13.04-12.418-23.235-10.468-37.896c0.656-10.79,4.327-20.248,11.338-28.363c-9.673,3.886-13.669,15.021-16.341,24.367
           c-4.637,14.986,6.432,28.466,7.542,41.893c0.492,5.929-0.957,11.824-6.536,17.851c-8.014,9.444-16.141,21.36-10.355,34.053
           c6.127,14.005,25.376,24.906,17.027,42.374c-4.555,11.015-15.462,19.353-15.014,32.364c-2.89-1.224-5.888-2.444-8.344-4.663
           c0-16.572,23.574-26.923,12.342-44.388c-0.995,3.446-1.209,8.129-1.988,12.022c-3.898,10.128-12.238,18.235-15.359,28.705
           c-5.219-2.014-10.676-6.246-15.017-10.695l6.013-3.68c-0.668-2.229-2.445-4.118-3.999-6.009c-3.905-0.549-6.469,2.013-9.688,3.017
           c-2.781-2.452-5.465-4.678-7.682-7.681c1.996-5.685,17.592-0.984,9.691-10.331c-5.334-3.335-10.688,1.429-15.359,3.653
           l-6.332-7.998c5.451-3.334,10.888-8.017,17.668-6.674c1.671,3.009,1.787,7.434,5.006,9.005c11.46-0.223,19.58-8.891,28.365-15.679
           c-6.123-9.111-11.107-21.689-5.668-32.707c4.358-11.041,15.713-20.34,16.228-32.546c0.116-2.778-0.317-5.701-1.532-8.847
           c-6.004-15.465-8.123-36.366,3.337-50.054c-6.231,1.674-9.905,9.44-12.022,15.337c-6.889,15.101,1.824,29.091,2.125,43.563
           c0.041,2.603-0.17,5.212-0.801,7.84c-5.898,11.902-15.454,22.345-17.006,36.041c-6.788,4.33-12.361,11.902-22.033,9.347
           c-0.34,2.556,0.439,6.452,1.326,9.347c-7.67-0.322-12.9,5.331-19.358,8.001c-3.44-1.104-4.335-5.551-5.667-8.663
           c7.559-2.553,13.012-10.131,21.691-10.011c1.006-2.795-0.564-5.356-1.007-8.023c-10.796-4.792-27.909,23.688-29.348-1.004
           c10.788-0.668,17.682-10.682,28.366-11.68l0.319-7.998c-12.125-1.225-19.925,11.24-32.045,10.011l-2.673-10.673
           c14.02,0.876,22.373-11.688,35.725-12.364c1.774-2.333,1.988-5.782,2.33-9.005c-14.574-1.899-24.575,14.252-40.043,9.347
           c0,0-0.533-6.722-0.822-10.512h0.021c-0.105-1.482-0.205-2.515-0.205-2.515c13.793,5.352,25.912-4.555,37.712-9.669
           c3.001-0.898,7.681,0.659,9.027-2.675c-0.117-2.559,4.55-5.551,0.665-7.337c-17.251-2.341-28.711,18.466-46.4,9.005l-1.327-2.675
           C6.262,91.145,34.616,42.539,81.667,18.62C100.723,7.73,124.397,2.179,148.272,1.982c28.813-0.239,57.927,7.319,79.585,22.65
           c21.032,12.901,41.15,34.162,52.068,55.745c10.442,18.91,15.248,40.129,16.683,62.719c-18.248,13.788-30.49-12.99-49.072-6.997
           c1.001,2.898,1.555,5.896,3.679,8.343c16.469-0.116,27.81,17.128,45.049,10.332L296.279,157.287L296.279,157.287z M86.667,95.369
           c-11.571-7.567-26.241-0.442-37.025,3.679c-1.001-10.128-5.114-19.355-13.69-26.029c-0.832-0.414-1.982-1.285-3.018-1.349
           c-0.62-0.039-1.21,0.211-1.668,1.004c3.887,23.913-11.658,40.599-22.674,58.739c3.668,2.998,9.561,2.55,14.01,1.669
           c11.678-4.67,22.802-12.798,36.707-10.012c4.112-7.008,11.021-13.796,16.686-19.358C79.456,100.717,84.211,98.815,86.667,95.369
           L86.667,95.369z M122.049,110.387c-0.222,1.44,0.111,4.007,2.331,3.015c3.454-4.783,9.569-0.999,13.349-0.662v-1.346
           c-2.074-3.257-6.341-4.893-10.674-4.73c-1,0.035-2.016,0.181-2.994,0.408C122.611,107.394,121.602,108.721,122.049,110.387
           L122.049,110.387z M176.445,96.056c-3.106-6.899-10.226-9.691-16.687-11.359c-3.167-0.39-6.454-0.654-9.714-0.685
           c-0.611-0.006-1.221-0.014-1.829,0c-9.119,0.184-17.832,2.525-23.155,10.031c-0.764,2.119-4.123,5.095-1.004,6.994
           c7.009-0.448,15.007-1.327,19.679,4.688c0,5.345,3.451,12.456-2.331,15.015c-4.791-4.436-10.465,1.888-15.678-1.672
           c-2.451-1.448-4.002,0.242-5.006,2.355c-1.449,13.791,5.772,29.011,18.674,36.684c5.229,1.886,12.258,3.68,17.715,1.004
           c13.126-6.112,18.563-20.12,21.007-33.026c-0.328-2.456-0.211-7.242-3.657-7.358c-3.891,2.461-9.566,1.007-13.69,0
           c-2.438,0.787-2.55,4.354-5.325,5.03l-1.691-1.349c-1.448-6.109-2.341-14.789,3.338-19.016c6.346-2.559,13.799-3.677,20.362-1.669
           C178.678,99.611,176.787,97.948,176.445,96.056L176.445,96.056z M169.748,107.025c-0.441,0.011-0.87,0.033-1.304,0.047
           c-2.331,1.555-9.124,0.437-6.672,5.668c4.23-3.346,10.126-1.001,14.353,0.662c1.563-0.776,1.224-2.334,1.327-3.677
           C176.095,107.2,172.852,106.963,169.748,107.025z M218.182,59.991c-8.234-0.437-15.129,4.237-22.695,6.352
           c-0.659-6.438,4.232-13.237,5.348-19.7c-12.233,0.787-21.922,8.15-32.042,14.032c-2.342-5.659-4.691-11.347-7.017-17.027
           l13.349-12.685l0.342-1.671l-18.031-1.004c-3.106-5.442-4.33-11.997-8.001-17.003c-3.004,5.673-5.022,11.677-8.023,17.345
           l-18.01,1.007v1.326l13.669,12.342c-1.671,6.344-3.224,13.237-7.336,18.032c-8.009-4.797-15.904-10.018-24.685-13.349
           c-2.113-0.682-5.125-1.791-7.016-0.342c2.777,6.12,6.666,12.703,6.012,19.383c-3.673-0.676-6.56-3.031-10.011-4.021
           c-4.127-1.126-9.024-3.326-13.028-1.988c6.676,9.339,12.125,19.113,14.01,30.352c22.147-10.689,47.975-16.568,74.785-12
           c12.567,2,24.123,7.119,35.36,11.336C205.601,78.923,213.054,69.453,218.182,59.991L218.182,59.991z M256.214,124.075
           c11.338,3.001,22.712,15.354,34.718,7.339c-10.456-17.351-26.019-33.374-21.691-56.064c0.453-1.549-0.548-3.117-1.988-3.337
           c-6.783,2.772-12.036,9.455-14.72,16.024c-1.104,3.885-1.758,8.015-3.313,11.677c-8.126-4.229-16.797-8.326-26.697-7.336
           c-3.57,0.445-8.688,0.679-9.347,4.344c11.235,6.004,20.474,16.024,27.359,26.694C245.329,122.634,251.208,123.302,256.214,124.075
           L256.214,124.075z M137.408,139.756l0.32,2.011c4.347,2.896,5.684,7.804,11.702,7.358c5.337,0.317,9.341-4.683,12-8.685
           C154.208,139.443,145.42,140.986,137.408,139.756L137.408,139.756z M143.418,130.751c0.217,0.891-0.551,2.226,0.662,2.676
           c3.56-0.773,10.009,1.894,11.997-2.333c-1.388-1.555-3.654-2.261-6.032-2.261C147.668,128.833,145.201,129.526,143.418,130.751z"
           />
       <g id="g4377">
           <path id="rect3815" opacity="0.99" fill="#FFFFFF" enable-background="new    " d="M137.416,126.891h24.392v10.021h-24.392
               V126.891z"/>
           <path id="path3032-6" sodipodi:nodetypes="cccsccc" inkscape:connector-curvature="0" fill="#007042" d="M141.922,132.249
               c3.152,0.746,3.932,1.864,6.423,2.176c2.648-0.047,2.266-0.585,6.885-2.179c0.303-0.107,0.72-0.776,0.203-1.289
               c-2.868-2.847-4.85-0.813-6.648-0.759c-2.385,0.026-4.622-2.042-6.952,0.646C141.436,131.39,141.229,131.926,141.922,132.249
               L141.922,132.249z"/>
       </g>
   </g>
   <g id="text4354">
       <path id="path4430" fill="#007042" d="M257.158,296.672v-14.273h-5.098v-2.906h13.652v2.906h-5.086v14.273H257.158z"/>
       <path id="path4432" fill="#007042" d="M267.916,296.672v-17.18h5.191l3.117,11.719l3.082-11.719h5.203v17.18h-3.223v-13.523
           l-3.41,13.523h-3.34l-3.398-13.523v13.523H267.916z"/>
   </g>
</g>
</svg>`;
    // let svgObj = `<svg xmlns="http://www.w3.org/2000/svg" height="250" width="250">
    //         <image href="${imageURL}" height="200" width="200"/>
    //         <text x="10" y="225" fill="red">Starbucks - ${status}</text>
    //     </svg>`;
    
    let attributes = `"attributes": [{"trait_type": "STATUS","value": "GOLD"},{"trait_type": "FREE","value": "1 Coffee/week"}]`;
    //attributes = JSON.stringify(attributes);

    // const [signer0, loyalUser] = await ethers.getSigners();
    // const nonce = await signer0.getTransactionCount();
    // console.log("Loyal User Address ", loyalUser.address);
    // console.log("Signer0 User Address ", signer0.address);

    //let txn = await nft.awardLoyaltyNFT(loyalUser.address, svgObj, attributes, {nonce:nonce});
    let txn = await nft.awardLoyaltyNFT(loyalUser, svgObj, attributes);
    txn.wait();

    console.log("Minting is complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });