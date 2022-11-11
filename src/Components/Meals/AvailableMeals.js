import React, { useEffect, useState } from "react";
import Card from "../UI/Card";

import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch(
                "firebaseDatabaseLinkHere/meals.json"
            );

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const responseData = await response.json();

            const loadedMeal = [];

            for (const key in responseData) {
                loadedMeal.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                });
            }

            setMeals(loadedMeal);

            setIsLoading(false);
        };

            fetchMeals().catch(error => {
                setIsLoading(false);
                setHttpError(error.message);
            });

    }, []);

    if (isLoading) {
        return <section className={classes.MealsLoading}>Loading...</section>;
    }

    if (httpError) {
        return (
            <section className={classes.MealsError}>
                <p>{httpError}</p>
            </section>
        );
    }

    const mealsList = meals.map((meal) => {
        return (
            <MealItem
                id={meal.id}
                key={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
            >
                {meal.name}
            </MealItem>
        );
    });

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
