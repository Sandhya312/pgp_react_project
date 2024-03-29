import React, { useEffect, useState } from 'react';
import warningIcon from '../images/warning.png';
import classes from  './Categories.module.css';
import image1 from '../images/categories/image 2.png'
import image2 from '../images/categories/image 3.png'
import image3 from '../images/categories/image 4.png'
import image4 from '../images/categories/image 6.png'
import image5 from '../images/categories/image 7.png'
import image6 from '../images/categories/image 8.png'
import image7 from '../images/categories/image 9.png'
import image8 from '../images/categories/image 10.png'
import image9 from '../images/categories/image 11.png'
import { useNavigate } from 'react-router-dom';


function Categories() {
    const navigate = useNavigate();

    useEffect(() => {
        let fetchedUserCate = JSON.parse(localStorage.getItem("ChoosedCategories"))

        if(fetchedUserCate){
            navigate('/home')
        }
        
    }, [navigate]);

    const cardData = [
        {
            id: 1,
            image: image1,
            title: "Action",
            bgColor: "#FF5209",
        },
        {
            id: 2,
            image: image2,
            title: "Drama",
            bgColor: "#D7A4FF",
        },
        {
            id: 3,
            image: image3,
            title: "Romance",
            bgColor: "#148A08",
        },
        {
            id: 4,
            image: image4,
            title: "Thriller",
            bgColor: "#84C2FF",
        },
        {
            id: 5,
            image: image5,
            title: "Western",
            bgColor: "#902500",
        },
        {
            id: 6,
            image: image6,
            title: "Horror",
            bgColor: "#7358FF",
        },
        {
            id: 7,
            image: image7,
            title: "Fantasy",
            bgColor: "#FF4ADE",
        },
        {
            id: 8,
            image: image8,
            title: "Music",
            bgColor: "#E61E32",
        },
        {
            id: 9,
            image: image9,
            title: "Fiction",
            bgColor: "#6CD061",
        },
    ]

    const [choosedCat, setChoosedCat] = useState([]);
    const [error, setError] = useState(false);

    const addHandler = (i) => {
        
        if (!isPresent(i.id)) {
            setChoosedCat([...choosedCat, i])
        } else {
            const filteredArray = removeElementFromArray(i.id);
            setChoosedCat([...filteredArray]);
        }

        if (choosedCat.length >= 2 ) {
            setError(false)
        }

    }

    const saveCategoriesInLocalStorage = () =>{
        let savedCategories = [];

        choosedCat.forEach((item, index)=>{
            savedCategories.push((item));
        })
        localStorage.setItem("ChoosedCategories", JSON.stringify(savedCategories))
    }

    const submitHandler = () => {
        if (choosedCat.length < 3) {
            setError(true);
        } else {
            setError(false)
            saveCategoriesInLocalStorage();
            navigate("/home");
        }
    }

    const removeElementFromArray = (id) => {
        return choosedCat.filter(item => item.id !== id);
    }

    const handleDelete = (element) => {
        const filteredArray = removeElementFromArray(element.id);
        setChoosedCat([...filteredArray]);
    }

    function isPresent(id) {
        for (let i = 0; i < choosedCat.length; i++) {
            if (choosedCat[i].id === id) {
                return true;
            }
        }
        return false;
    }

    return (
        <div className={classes.cateContainer}>
            <div className={classes.cateBox}>
                <section className={classes.left}>
                    <div className={classes.leftBox}>
                        <h1>Super app</h1>
                        <h2>Choose your entertainment category</h2>
                        <div className={classes.cateCard}>
                            {
                                choosedCat &&
                                choosedCat.map((item, index) => (
                                    <div key={index}><h1>{item.title}</h1> <span onClick={() => handleDelete(item)}>X</span></div>
                                ))
                            }
                        </div>
                        {
                            error &&
                            <div className={classes.warning}>
                                <img src={warningIcon} alt="warn" />
                                <span>Minimum 3 category required</span>
                            </div>
                        }
                    </div>
                </section>
                <section className={classes.right}>
                    <div className={classes.catCardBox}>
                        {
                            cardData.map((item, index) => (
                                <div className={classes.cardContainer} 
                                key={index} onClick={() => addHandler(item)}
                                 style={{ backgroundColor: item.bgColor, borderColor: isPresent(item.id) && '#11B800'}}>
                                    <h1>{item.title}</h1>
                                    <img src={item.image} alt='item' />
                                </div>
                            ))
                        }
                    </div>
                    <button onClick={submitHandler}>Next Page</button>
                </section>
            </div>
        </div>
    )
}

export default Categories