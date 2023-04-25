import { useState, useEffect } from "react";
import SpaceComponent from "./SpaceComponent";
import { DataService } from "../../services/DataService";
import { NavLink } from "react-router-dom";
import { SpaceEntry } from "../model/model";

interface SpacesProps {
    dataService: DataService
}

export default function Spaces(props: SpacesProps){

    const [spaces, setSpaces] = useState<SpaceEntry[]>();
    const [reservationText, setReservationText] = useState<string>();

    useEffect(()=>{
        const getSpaces = async ()=>{
            console.log('getting spaces....')
            const spaces = await props.dataService.getSpaces();
            setSpaces(spaces);
        }
        getSpaces();
    }, [])

    async function reserveSpace(spaceId: string, spaceName: string){
        const reservationResult = await props.dataService.reserveSpace(spaceId);
        setReservationText(`You reserved ${spaceName}, reservation id: ${reservationResult}`);
    }

    function renderSpaces(){
        if(!props.dataService.isAuthorized()) {
            return<NavLink to={"/login"}>Please login</NavLink>
        }
        const rows: any[] = [];
        if(spaces) {
            for(const spaceEntry of spaces) {
                rows.push(
                    <SpaceComponent 
                        key={spaceEntry.id}
                        id={spaceEntry.id}
                        location={spaceEntry.location}
                        name={spaceEntry.name}
                        photoUrl={spaceEntry.photoUrl}
                        reserveSpace={reserveSpace}
                    />
                )
            }
        }

        return rows;
    }

    return (
        <div>
            <h2>Welcome to the Spaces page!</h2>
            {reservationText? <h2>{reservationText}</h2>: undefined}
            {renderSpaces()}
        </div>
    )        
    

}