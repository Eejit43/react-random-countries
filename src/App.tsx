import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CountryCard from './CountryCard';

export interface Country {
    name: CountryName;
    capital: string[];
    languages: Record<string, string>;
}

interface CountryName {
    common: string;
    official: string;
    nativeName: Record<string, { official: string; common: string }>;
}

const AmountInput = styled.input`
    display: block;
    font-size: large;
    margin: auto;
    margin-top: 20px;
`;

const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    font-family: sans-serif;
    grid-gap: 30px;
    margin: 20px;
    max-width: 80%;
    justify-self: center;

    & > div {
        border: 1px solid black;
        border-radius: 5px;
        padding: 10px;
        max-width: 300px;

        & h2 {
            margin-top: 0;
        }

        & div:first-of-type {
            margin-bottom: 1rem;
        }
    }
`;

export default function App() {
    const [amount, setAmount] = useState(0);

    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all?fields=name,capital,languages')
            .then((response) => response.json())
            .then((data) => setCountries(data));
    }, []);

    const randomCountries = new Array(Number.isNaN(amount) ? 0 : amount)
        .fill(null)
        .map(() => countries[Math.floor(Math.random() * countries.length)])
        .sort((a, b) => a.name.common.localeCompare(b.name.common));

    return (
        <>
            <AmountInput
                type="number"
                value={Number.isNaN(amount) ? '' : amount}
                onChange={(event) => {
                    const value = Number.parseInt(event.target.value);

                    if (Number.isNaN(value)) return setAmount(value);

                    setAmount(value > 0 ? (value <= 10 ? value : 10) : 0);
                }}
            />

            <CardsContainer>
                {randomCountries.map((country) => (
                    <CountryCard key={nanoid()} country={country} />
                ))}
            </CardsContainer>
        </>
    );
}
