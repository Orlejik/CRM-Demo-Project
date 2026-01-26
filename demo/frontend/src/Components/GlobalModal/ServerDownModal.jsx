import { useEffect, useState } from "react";
import { subscribeServerStatus } from "../Helpers/AxiosHelper/ServerStatus";

export default function ServerDownModal() {
    const [down, setDown] = useState(false);

    useEffect(() => {
        console.log("🟢 ServerDownModal mounted");
        return subscribeServerStatus(setDown);
    }, []);

    if (!down) return null;

    return (
        <div style={backdrop}>
            <div style={modal}>
                <h2>Сервис, <b  style={{fontSize: "30px", color: "red"}}>СЦУКА </b>, временно недоступен</h2>
                <p>
                    Потеряно соединение с сервером или базой данных. <br/>
                    <b  style={{fontSize: "30px", color: "red"}}>так ты, блядина, хотела??? </b>
                </p>
            </div>
        </div>
    );
}

const backdrop = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999
};

const modal = {
    background: "#fff",
    padding: "30px",
    borderRadius: "8px",
    width: "400px",
    textAlign: "center"
};
