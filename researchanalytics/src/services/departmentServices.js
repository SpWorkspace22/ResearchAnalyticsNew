import axios from "axios";
import { platformsApi } from "./apiFile";

export async function loadDepartment(){
    let data;
    // await axios.get(platformsApi).then(function (response) {
    //     // handle success
    //     data = [...response.data];
    // }).catch(function (error) {
    //     // handle error
    //     console.log(error);
    // });

    return data;
}