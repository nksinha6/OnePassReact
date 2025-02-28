export const gerUserRole = () => {
    const pathname = window.location.pathname;

    if(pathname.includes("/host")){
        return "host";
    }else if(pathname.includes("/visitor")){
        return "visitor";
    }else if(pathname.includes("/desk-admin")){
        return "desk-admin";
    }else{
        return "user";
    }
};