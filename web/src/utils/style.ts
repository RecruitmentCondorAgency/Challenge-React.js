const styles = {
    paddingX: "sm:px-16 px-6",
    paddingY: "sm:py-16 py-6",
    padding: "sm:px-16 px-6 sm:py-16 py-10",

    heroHeadText:
        "font-black text-black lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2",
    heroSubText:
        "text-gray-500 font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]",

    sectionHeadText:
        "text-black font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]",
    sectionSubText:
        "sm:text-[18px] text-[14px] text-secondary tracking-wider",
    marginX: "sm:mx-16 mx-6",
    marginY: "sm:my-16 my-6",
    flexCenter: "flex justify-center items-center",
    flexStart: "flex justify-center items-start",
    heading2: "font-poppins font-semibold xs:text-[38px]  sm:text-[40px] md:text-[40px] text-[30px] text-black xs:leading-[76.8px] leading-[66.8px] ",
    paragraph: "font-poppins font-normal text-black text-[18px] leading-[30.8px]",
    inputError:'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500',
    inputNormal: 'py-4 px-6 border-2 placeholder:text-secondary text-black rounded-lg outlined-none font-medium',
    pError:'mt-2 text-sm text-red-600 dark:text-red-500',
    inputCheckbox:"w-4 h-4 m-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
};

export const layout = {
    section: `flex md:flex-row flex-col ${styles.paddingY}`,
    sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,
    sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
    sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,
    sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
};


export default styles;