import React from 'react'
import './Profile.css';
import ProfileDescription from './ProfileDescription/ProfileDescription';
import ProfileForm from './ProfileForm/ProfileForm';
import Reviews from './Reviews';
import {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import {CharactersContext, light, dark} from '../../../App';
import {FaJediOrder, FaEmpire} from 'react-icons/fa';
import {RiHeartFill, RiHeartAddFill} from 'react-icons/ri';


function Profile(props) {
    const params = props.match.params;
    const {characters, toggleFavourite} = useContext(CharactersContext);
    const model = characters.filter(character => (character.id.toString() === params.id));
    const [openForm, setOpenForm] = useState(false);
    const next = (id) => {
        if (id === 88) {
            return '/profile/1';
        } else if (id === 16 || id === 76) {
            return `/profile/${id + 2}`;
        } else {
            return `/profile/${id + 1}`;
        }
    }
    const prev = (id) => {
        if (id === 1) {
            return '/profile/88';
        } else if (id === 18 || id === 78) {
            return `/profile/${id - 2}`;
        } else {
            return `/profile/${id - 1}`;
        }
    }

    const side = () => {
        if ((light.some(affiliation => model[0].affiliations.includes(affiliation)) && !dark.some(affiliation => model[0].affiliations.includes(affiliation)))){
            return true;
        }else if (model[0].id===3){
            return true;
        }
        else{
            return false;
        };     
    };
    
    return (
        <main className="Profile col-12 col-md-10 offset-md-1 px-0 py-md-5 dark">
            <div style={{background:"var(--secondary-color"}} className="d-flex justify-content-between align-items-baseline mb-2 pt-1">
                <div className="d-flex align-items-baseline">
                    <h1 style={{color:"var(--dark)"}}className="mb-0 pr-3">{model[0].name}</h1>
                    {side() ?
                        <FaJediOrder size={"1.9em"} style={{color:"var(--dark)"}}/> :
                        <FaEmpire size={"1.9em"} style={{color: "var(--dark)"}}/>
                    }
                </div>
                {model[0].isFavourite ?
                <RiHeartFill onClick={() =>toggleFavourite(model[0].id)} className="mr-2 favourite-icon active" size={"2em"} color={"var(--color-warm)"}/> :
                <RiHeartAddFill onClick={()=> toggleFavourite(model[0].id)} className="mr-2 favourite-icon" size={"2em"} color={"var(--dark"} />
                }    
            </div>
            <ProfileDescription 
                params={params} 
                model={model} 
                prev={prev} 
                next={next} 
                onClick={value => setOpenForm(value)} 
                openForm={openForm} 
            />
            <Reviews side={side()}/>
            <ProfileForm openForm={openForm} model={model} side={side} />
    
            {window.innerWidth < 768 &&
                <div className="col-10 offset-1 w-100 d-flex flex-row-reverse justify-content-between p-0">
                    <Link className="py-2 text-secondary" to={next(parseInt(params.id))}>Next</Link>
                    <Link className="py-2 text-secondary" to={prev(parseInt(params.id))}>Prev</Link>
                </div>
            }
        </main>
    )
}

export default Profile;
