import styles from '@/styles/Header.module.css';
import Image from 'next/image';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <svg width="28" height="39" viewBox="0 0 28 39" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.52007 1.13596L0.662768 0.310169L0.00784302 0H3.72244L2.52007 1.13596Z" fill="#F8FFFF"/>
          <path d="M0.00448608 0.529785L1.86347 2.40268L3.72244 4.27558L0.011203 4.28238L0.00448608 0.529785Z" fill="#F8FFFF"/>
          <path d="M3.3698 5.14948L2.46298 7.63932L1.5556 10.1292L0.000572205 6.72183L3.3698 5.14948Z" fill="#F8FFFF"/>
          <path d="M3.63456 4.59479L1.82708 5.43417L0.00784302 6.27921V4.62196L3.63456 4.59479Z" fill="#F8FFFF"/>
          <path d="M0.00784202 7.75931L1.10946 10.2831L1.72912 11.6868L0.00504303 11.6811L0.00784202 7.75931Z" fill="#F8FFFF"/>
          <path d="M7.56578 5.9L4.84644 6.12697L3.33172 6.25941L3.901 4.61404L7.56578 5.9Z" fill="#F8FFFF"/>
          <path d="M10.1424 6.50675L6.40707 5.14948L3.98944 4.30614L5.16831 3.03433L10.1424 6.50675Z" fill="#F8FFFF"/>
          <path d="M3.98944 3.75259L7.20753 0L3.98944 1.61254" fill="#F8FFFF"/>
          <path d="M3.98944 1.26445L6.62258 0H3.98944" fill="#F8FFFF"/>
          <path d="M11.3 1.28596L9.18295 2.40607L7.06592 3.58732L7.94139 0L11.3 1.28596Z" fill="#F8FFFF"/>
          <path d="M12.939 0L12.8768 0.84787L12.8102 1.43934L8.92266 0H12.939Z" fill="#F8FFFF"/>
          <path d="M6.62259 3.64562L5.91169 3.09603L5.44876 2.74964L7.6352 0L6.62259 3.64562Z" fill="#F8FFFF"/>
          <path d="M3.72076 3.8109L3.81088 0.292633L2.02243 2.09705" fill="#F8FFFF"/>
          <path d="M2.31744 1.26445L0.000572205 0.191315L1.6849 1.82253" fill="#F8FFFF"/>
          <path d="M27.9961 0.0435791L27.0893 2.53342L26.1819 5.02326L25.12 3.21206L27.9961 0.0435791Z" fill="#F8FFFF"/>
          <path d="M11.7607 7.29801L7.19802 3.89125L11.5804 1.43933" fill="#F8FFFF"/>
          <path d="M27.4996 0.0435791L25.4917 2.12816L24.8631 2.7785L23.4838 0.0435791H27.4996Z" fill="#F8FFFF"/>
          <path d="M27.9961 6.14338L26.5581 5.41606L27.9961 1.1886V6.14338Z" fill="#F8FFFF"/>
          <path d="M15.4557 3.38525L12.0764 2.87246L15.1512 0.0435791" fill="#F8FFFF"/>
          <path d="M13.1433 1.43934L13.2446 0.0435791H14.63" fill="#F8FFFF"/>
          <path d="M11.9622 2.55662L11.9527 1.43933L12.8863 1.82251" fill="#F8FFFF"/>
          <path d="M20.0323 0.0435791L20.0609 1.43991L20.0922 2.7785L18.713 0.0435791H20.0323Z" fill="#F8FFFF"/>
          <path d="M23.1194 0.0435791L25.3915 4.64178L22.7265 3.79334L20.3329 3.06829L23.1194 0.0435791Z" fill="#F8FFFF"/>
          <path d="M12.0355 7.26859L11.9527 3.19394L12.8863 3.38525" fill="#F8FFFF"/>
          <path d="M6.09977 10.3997L3.20859 10.5667L1.69386 10.6991L2.48929 8.3989L6.09977 10.3997Z" fill="#F8FFFF"/>
          <path d="M5.44876 6.37204L7.9302 8.60039C7.38163 8.93659 6.91926 9.39392 6.91926 9.39392C6.91926 9.39392 6.53079 9.74258 6.20332 10.2418L5.44876 6.37204Z" fill="#F8FFFF"/>
          <path d="M5.16495 6.39807L3.89653 7.2799L2.59619 8.19399L3.27407 6.55429L5.16495 6.39807Z" fill="#F8FFFF"/>
          <path d="M5.74599 9.7154L4.68467 9.18393L3.06303 8.43567L5.1879 6.67258L5.74599 9.7154Z" fill="#F8FFFF"/>
          <path d="M11.4153 7.35914L8.61311 6.81578L5.92232 6.29732L8.3058 6.12469L11.4153 7.35914Z" fill="#F8FFFF"/>
          <path d="M8.27949 8.39152C8.27949 8.39152 9.0654 7.90363 10.3422 7.58101L6.46921 6.67258L8.27949 8.39152Z" fill="#F8FFFF"/>
          <path d="M18.3189 0.350342L18.2875 1.89439L18.2618 3.75937L14.63 4.96042L18.3189 0.350342Z" fill="#F8FFFF"/>
          <path d="M17.7457 0.0469758L18.1744 0.0435791L15.8475 2.83623L15.5447 0.0435791L17.7457 0.0469758Z" fill="#F8FFFF"/>
          <path d="M21.7693 0.0435791L21.5616 0.812776L21.4328 1.30406L20.4499 0.0435791H21.7693Z" fill="#F8FFFF"/>
          <path d="M22.8832 0.0435791L22.3548 0.618071L21.6685 1.30406L21.9579 0.0435791H22.8832Z" fill="#F8FFFF"/>
          <path d="M21.3897 1.54291L20.8613 2.09929L20.3329 2.65567L20.3407 0.301666L21.3897 1.54291Z" fill="#F8FFFF"/>
          <path d="M15.2245 3.74013L14.6776 4.3684L13.6868 5.46644L13.3246 3.42883L15.2245 3.74013Z" fill="#F8FFFF"/>
          <path d="M12.3238 7.23633C12.3238 7.23633 12.9748 7.16785 13.6723 7.1486L13.0895 3.86127L12.3238 7.23633Z" fill="#F8FFFF"/>
          <path d="M20.2551 3.53922L25.12 4.96045L18.1744 5.23099L14.1296 5.43702L20.2551 3.53922Z" fill="#F8FFFF"/>
          <path d="M20.0474 3.24828L19.2414 3.47185L18.6144 3.66203L18.6172 0.674103L20.0474 3.24828Z" fill="#F8FFFF"/>
          <path d="M14.0294 7.13956C14.0294 7.13956 15.4551 7.09598 17.1842 7.29068L13.7075 5.60739" fill="#F8FFFF"/>
          <path d="M21.088 8.11929L25.8158 5.37927L23.729 7.58555L21.088 10.4569V8.11929Z" fill="#F8FFFF"/>
          <path d="M19.7939 5.60739L18.2495 7.42992L16.7588 6.61091L14.9832 5.76304L19.7939 5.60739Z" fill="#F8FFFF"/>
          <path d="M21.7469 5.52304L18.6967 7.50405L19.4557 6.60806L20.3329 5.56889L21.7469 5.52304Z" fill="#F8FFFF"/>
          <path d="M22.0805 5.46644L25.42 5.27457L20.5926 7.94836" fill="#F8FFFF"/>
          <path d="M19.0415 7.56632C19.0415 7.56632 19.6589 7.67726 20.2221 7.8363L21.3662 6.14056L19.0415 7.56632Z" fill="#F8FFFF"/>
          <path d="M20.3351 32.4404L23.0545 32.2134L24.5686 32.0804L23.9994 33.7263L20.3351 32.4404Z" fill="#F8FFFF"/>
          <path d="M21.088 11.0829L26.1298 5.71661L27.9961 6.67259L26.4159 7.64328L21.088 11.0829Z" fill="#F8FFFF"/>
          <path d="M5.19071 13.8523C5.19071 13.8523 5.1045 12.2619 5.8154 10.9091L2.05322 11.2612L5.19071 13.8523Z" fill="#F8FFFF"/>
          <path d="M0.00784302 12.3015H2.3958L5.21198 14.4846L0.00784302 12.3015Z" fill="#F8FFFF"/>
          <path d="M5.27355 15.063C5.27355 15.063 5.40622 17.1029 7.01666 18.3945L0.00784302 12.9082L5.27355 15.063Z" fill="#F8FFFF"/>
          <path d="M25.4805 37.364L27.3378 38.1898L27.9927 38.5H24.2781L25.4805 37.364Z" fill="#F8FFFF"/>
          <path d="M27.9955 37.9702L26.1371 36.0973L24.2781 34.2244L27.9894 34.2176L27.9955 37.9702Z" fill="#F8FFFF"/>
          <path d="M24.6308 33.3505L25.5376 30.8607L26.445 28.3708L28 31.7781L24.6308 33.3505Z" fill="#F8FFFF"/>
          <path d="M24.366 33.9052L26.1735 33.0658L27.9927 32.2208V33.878L24.366 33.9052Z" fill="#F8FFFF"/>
          <path d="M17.4579 31.6949L21.5935 33.3505L24.0111 34.1938L22.8317 35.4656L17.4579 31.6949Z" fill="#F8FFFF"/>
          <path d="M24.0111 34.7474L20.793 38.5L24.0111 36.8875" fill="#F8FFFF"/>
          <path d="M24.0111 37.2355L21.378 38.5H24.0111" fill="#F8FFFF"/>
          <path d="M16.7006 37.214L18.8176 36.0939L20.9346 34.9127L20.0592 38.5L16.7006 37.214Z" fill="#F8FFFF"/>
          <path d="M15.0616 38.5L15.1237 37.6521L15.1903 37.0606L19.0779 38.5H15.0616Z" fill="#F8FFFF"/>
          <path d="M21.378 34.8544L22.0889 35.404L22.5518 35.7504L20.3654 38.5L21.378 34.8544Z" fill="#F8FFFF"/>
          <path d="M24.2792 34.6891L24.1897 38.2074L25.9781 36.403" fill="#F8FFFF"/>
          <path d="M25.6831 37.2355L28 38.3087L26.3151 36.6775" fill="#F8FFFF"/>
          <path d="M0.00448608 38.4564L0.911305 35.9666L1.81868 33.4767L2.88056 35.288L0.00448608 38.4564Z" fill="#F8FFFF"/>
          <path d="M16.2399 31.202L20.8025 34.6087L16.4201 37.0606" fill="#F8FFFF"/>
          <path d="M0.500992 38.4564L2.50887 36.3718L3.13748 35.7215L4.51674 38.4564H0.500992Z" fill="#F8FFFF"/>
          <path d="M0.00448608 32.3566L1.44252 33.0839L0.00448608 37.3114V32.3566Z" fill="#F8FFFF"/>
          <path d="M12.5443 35.1147L15.9242 35.6275L12.8494 38.4564" fill="#F8FFFF"/>
          <path d="M14.8573 37.0606L14.7554 38.4564H13.3705" fill="#F8FFFF"/>
          <path d="M16.0384 35.9434L16.0479 37.0606L15.1142 36.6775" fill="#F8FFFF"/>
          <path d="M7.96826 38.4564L7.93971 37.0601L7.90836 35.7215L9.28762 38.4564H7.96826Z" fill="#F8FFFF"/>
          <path d="M4.88115 38.4564L2.60906 33.8582L5.2741 34.7067L7.66766 35.4317L4.88115 38.4564Z" fill="#F8FFFF"/>
          <path d="M15.9651 31.2314L16.0479 35.3061L15.1142 35.1148" fill="#F8FFFF"/>
          <path d="M9.6817 38.1496L9.71305 36.6056L9.7388 34.7406L13.3706 33.5396L9.6817 38.1496Z" fill="#F8FFFF"/>
          <path d="M10.2549 38.453L9.82612 38.4564L12.1531 35.6638L12.4559 38.4564L10.2549 38.453Z" fill="#F8FFFF"/>
          <path d="M6.2313 38.4564L6.43897 37.6872L6.56772 37.1959L7.55011 38.4564H6.2313Z" fill="#F8FFFF"/>
          <path d="M5.11737 38.4564L5.64579 37.8819L6.33206 37.1959L6.04266 38.4564H5.11737Z" fill="#F8FFFF"/>
          <path d="M6.61082 36.9571L7.13924 36.4007L7.66766 35.8443L7.65982 38.1983L6.61082 36.9571Z" fill="#F8FFFF"/>
          <path d="M12.7761 34.7599L13.323 34.1316L14.3137 33.0336L14.6759 35.0712L12.7761 34.7599Z" fill="#F8FFFF"/>
          <path d="M7.74547 34.9608L2.88055 33.5396L9.82612 33.269L13.871 33.063L7.74547 34.9608Z" fill="#F8FFFF"/>
          <path d="M7.95315 35.2517L8.75921 35.0281L9.38614 34.838L9.38335 37.8259L7.95315 35.2517Z" fill="#F8FFFF"/>
          <path d="M8.20671 32.8926L9.7511 31.0701L11.2418 31.8891L13.0173 32.737L8.20671 32.8926Z" fill="#F8FFFF"/>
          <path d="M6.25369 32.9769L9.30385 30.9959L8.54481 31.8919L7.66766 32.9311L6.25369 32.9769Z" fill="#F8FFFF"/>
          <path d="M5.92008 33.0336L2.58052 33.2254L7.36035 30.5782" fill="#F8FFFF"/>
          <path d="M5.62117 28.7914L1.87074 32.7834L0.00448608 31.8274L1.60989 30.996L5.62117 28.7914Z" fill="#F8FFFF"/>
          <path d="M5.62117 29.4044V29.963C5.62117 29.963 6.38021 30.2901 6.87056 30.4339L2.29617 32.9764L5.62117 29.4044Z" fill="#F8FFFF"/>
          <path d="M7.59153 30.6394C7.59153 30.6394 8.46868 30.8477 8.91034 30.9173L6.75524 32.2372L7.59153 30.6394Z" fill="#F8FFFF"/>
          <path d="M10.6658 31.1363C10.6658 31.1363 13.5676 31.3865 15.468 31.0927L15.7854 31.0537L14.002 32.8439L10.6658 31.1363Z" fill="#F8FFFF"/>
          <path d="M14.5869 32.7573L14.8797 34.6789L15.5811 31.7527L14.5869 32.7573Z" fill="#F8FFFF"/>
          <path d="M5.62117 28.3425L5.21198 26.1006L0.00784302 31.305L5.62117 28.3425Z" fill="#F8FFFF"/>
          <path d="M21.088 11.4712V12.4373L25.5107 14.5129L21.088 11.4712Z" fill="#F8FFFF"/>
          <path d="M21.7469 11.2464L27.9961 7.23633V11.2464H21.7469Z" fill="#F8FFFF"/>
          <path d="M22.1857 11.6896L27.9961 15.6516V11.6896H22.1857Z" fill="#F8FFFF"/>
          <path d="M16.4784 30.9388C16.4784 30.9388 18.7415 30.5392 20.1275 29.4117L20.0513 32.1336L16.4784 30.9388Z" fill="#F8FFFF"/>
          <path d="M10.1888 13.1578C10.1888 13.1578 9.91345 14.2089 10.3422 14.9747L14.644 13.8518L10.1888 13.1578Z" fill="#F8FFFF"/>
          <path d="M10.3624 12.7067L14.7157 13.4431L14.3574 11.3206C14.3574 11.3206 10.9971 11.2623 10.3624 12.7067Z" fill="#F8FFFF"/>
          <path d="M12.5387 14.7534L13.4198 15.312L10.5157 15.2537L12.5387 14.7534Z" fill="#F8FFFF"/>
          <path d="M10.874 15.6143C10.874 15.6143 11.5983 16.2035 13.0576 16.6223L15.1943 15.6471L10.874 15.6143Z" fill="#F8FFFF"/>
          <path d="M20.4611 31.9485L22.5093 31.7527L20.4611 29.1468V31.9485Z" fill="#F8FFFF"/>
          <path d="M20.7343 28.8865C20.7343 28.8865 21.6327 27.9712 21.9758 27.056L23.0427 31.8251L20.7343 28.8865Z" fill="#F8FFFF"/>
          <path d="M27.2163 29.0314L27.9927 30.8233V26.8155L27.2163 29.0314Z" fill="#F8FFFF"/>
          <path d="M27.0064 28.6267L25.8729 26.5551L27.9927 25.4571L27.0064 28.6267Z" fill="#F8FFFF"/>
          <path d="M14.7157 11.3206C14.7157 11.3206 16.1375 11.29 16.9598 11.4276L15.4232 14.9753L14.7157 11.3206Z" fill="#F8FFFF"/>
          <path d="M13.0005 14.6283L14.0725 15.4734L14.9228 14.1512L13.0005 14.6283Z" fill="#F8FFFF"/>
          <path d="M14.3513 15.4156L15.0728 14.4115L15.1943 15.4156H14.3513Z" fill="#F8FFFF"/>
          <path d="M17.3275 11.4779C17.3275 11.4779 18.9604 11.6704 19.9539 12.0558L15.4652 15.7597L17.3275 11.4779Z" fill="#F8FFFF"/>
          <path d="M13.5323 16.7599L15.2446 15.9505L14.9989 17.1714C14.9983 17.1714 13.576 16.7729 13.5323 16.7599Z" fill="#F8FFFF"/>
          <path d="M20.2439 12.1453L17.786 14.3413L20.2014 15.2809L20.2439 12.1453Z" fill="#F8FFFF"/>
          <path d="M20.535 12.2364V14.021L21.7116 13.9706L20.535 12.2364Z" fill="#F8FFFF"/>
          <path d="M21.3186 12.9229L24.0699 16.3405L23.8482 14.0572L21.3186 12.9229Z" fill="#F8FFFF"/>
          <path d="M24.3912 14.4115L27.9961 16.3405L24.9627 19.1863" fill="#F8FFFF"/>
          <path d="M28 17.1714L22.1852 22.5184C22.1852 22.5184 22.5703 23.3855 22.4018 25.2352L28 17.1714Z" fill="#F8FFFF"/>
          <path d="M20.535 14.4845L21.8885 14.4115L24.2781 17.2874L20.535 14.4845Z" fill="#F8FFFF"/>
          <path d="M15.6113 16.1186L17.5262 14.6317L19.0152 15.1966L15.6113 16.1186Z" fill="#F8FFFF"/>
          <path d="M15.2446 17.22L15.4646 16.4491L19.7843 15.4156L15.2446 17.22Z" fill="#F8FFFF"/>
          <path d="M15.9617 17.438L21.1233 15.3749L19.439 18.8937C19.439 18.8937 18.1269 18.0419 15.9617 17.438Z" fill="#F8FFFF"/>
          <path d="M0.000572205 13.6191L0.00784857 17.6632L3.98945 16.7989L0.000572205 13.6191Z" fill="#F8FFFF"/>
          <path d="M7.3889 18.6894C7.3889 18.6894 8.6243 19.4982 9.48074 19.8265L5.21198 21.979L7.3889 18.6894Z" fill="#F8FFFF"/>
          <path d="M4.50164 17.22L6.54086 18.8937L0.00784302 18.2796L4.50164 17.22Z" fill="#F8FFFF"/>
          <path d="M0.00784202 18.8937L0.00504303 22.4029L6.09976 19.5899L0.00784202 18.8937Z" fill="#F8FFFF"/>
          <path d="M0.000572205 23.1834L5.49746 20.4377L2.29617 24.9176L0.000572205 23.1834Z" fill="#F8FFFF"/>
          <path d="M0 23.8768L3.77729 26.8104L0.00839698 30.6394L0 23.8768Z" fill="#F8FFFF"/>
          <path d="M2.8145 25.2352L3.98944 26.3049L4.74009 22.2586L2.8145 25.2352Z" fill="#F8FFFF"/>
          <path d="M4.7401 25.2352L5.21198 22.5184L7.34636 21.5647L4.7401 25.2352Z" fill="#F8FFFF"/>
          <path d="M5.62116 25.645C5.62116 25.645 7.69845 26.5285 9.82779 26.8466L9.66602 23.0385L5.62116 25.645Z" fill="#F8FFFF"/>
          <path d="M5.7404 24.8452L8.32708 20.972L9.942 22.4029L5.7404 24.8452Z" fill="#F8FFFF"/>
          <path d="M8.84149 20.7841L10.3137 21.979L9.8278 19.9663L8.84149 20.7841Z" fill="#F8FFFF"/>
          <path d="M10.1015 23.0578L11.4573 22.2586L10.3624 26.9117L10.1015 23.0578Z" fill="#F8FFFF"/>
          <path d="M10.3137 20.1468L10.8852 22.1358L12.0053 20.6721L10.3137 20.1468Z" fill="#F8FFFF"/>
          <path d="M15.4501 21.7865C15.4501 21.7865 16.3172 22.0927 16.8696 22.6718L15.0112 23.5592L15.4501 21.7865Z" fill="#F8FFFF"/>
          <path d="M17.0684 22.9089L15.8206 23.4823L17.4787 24.0783C17.4792 24.0783 17.4775 23.4432 17.0684 22.9089Z" fill="#F8FFFF"/>
          <path d="M11.3644 21.979L12.2785 20.7502L13.2608 21.0411L11.3644 21.979Z" fill="#F8FFFF"/>
          <path d="M10.9518 26.9983C10.9518 26.9983 12.0305 27.116 13.506 27.0815L11.8665 22.4029L10.9518 26.9983Z" fill="#F8FFFF"/>
          <path d="M13.5066 24.2815L13.7439 23.4002L16.8422 26.3049L13.5066 24.2815Z" fill="#F8FFFF"/>
          <path d="M14.9301 24.0783L15.6018 23.7466L17.4792 24.3828L14.9301 24.0783Z" fill="#F8FFFF"/>
          <path d="M15.3588 24.4982L17.0364 26.1006C17.0364 26.1006 17.4238 25.628 17.4921 24.745L15.3588 24.4982Z" fill="#F8FFFF"/>
          <path d="M13.5855 21.1413L15.1288 21.6609L14.63 23.6843L13.5855 21.1413Z" fill="#F8FFFF"/>
          <path d="M12.2292 22.0175L12.9625 24.1756L13.2961 21.5647L12.2292 22.0175Z" fill="#F8FFFF"/>
          <path d="M13.5066 22.7402L13.9533 23.1738L13.6482 22.1357L13.5066 22.7402Z" fill="#F8FFFF"/>
          <path d="M13.2961 25.2352L14.0132 27.056C14.0132 27.056 15.7938 26.949 16.3183 26.627C16.8428 26.3049 16.3183 26.5455 16.3183 26.5455L13.0347 24.5848L13.2961 25.2352Z" fill="#F8FFFF"/>
          <path d="M23.4715 31.7142L24.9011 31.4397L22.2714 26.1006L23.4715 31.7142Z" fill="#F8FFFF"/>
          <path d="M25.0965 30.7265L26.1936 27.7499L22.3794 25.6042L25.0965 30.7265Z" fill="#F8FFFF"/>
          <path d="M22.8048 25.2997L26.0918 20.6834L24.4483 26.1747L22.8048 25.2997Z" fill="#F8FFFF"/>
          <path d="M24.82 26.3049L25.9205 22.4125L27.9211 24.7456L24.82 26.3049Z" fill="#F8FFFF"/>
          <path d="M27.9211 18.1686L26.3705 21.6224L27.9961 23.6843L28 17.9088L27.9211 18.1686Z" fill="#F8FFFF"/>
          <path d="M21.4328 15.6516L23.2997 17.0366L19.7306 19.0793L21.4328 15.6516Z" fill="#F8FFFF"/>
          <path d="M20.0849 19.329C20.0849 19.329 20.8417 19.8254 21.4614 20.796L23.7671 17.2868L20.0849 19.329Z" fill="#F8FFFF"/>
          <path d="M24.0699 17.4798L24.5199 17.7691L24.6722 19.638L24.0699 17.4798Z" fill="#F8FFFF"/>
          <path d="M23.7671 17.8172L22.694 19.5706L24.371 19.9561L23.7671 17.8172Z" fill="#F8FFFF"/>
          <path d="M21.6232 21.0926C21.6232 21.0926 21.94 21.5335 22.1034 22.1511L24.0693 20.3025L21.6232 21.0926Z" fill="#F8FFFF"/>
          <path d="M21.7665 20.7502L22.4068 19.7246L23.6624 20.0523L21.7665 20.7502Z" fill="#F8FFFF"/>
        </svg>

      </div>

      <div className={styles.profile}>
        <Image
          src="/foto.jpg"
          alt="Foto de perfil"
          width={40}
          height={40}
          className={styles.avatar}
        />
        <div className={styles.userInfo}>
          <span className={styles.name}>Avelar</span>
          <span className={styles.username}>@avelando</span>
        </div>
      </div>
    </header>
  );
}
