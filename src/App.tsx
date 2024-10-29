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
`;

const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    font-family: sans-serif;
    grid-gap: 30px;
    margin: 20px;
    max-width: 80%;
    justify-self: center;

    & div {
        border: 1px solid black;
        padding: 10px;
        max-width: 300px;

        & h2 {
            margin-top: 0;
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

    const randomCountries = new Array(Math.min(Math.max(Number.isNaN(amount) ? 0 : amount, 0), countries.length))
        .fill(null)
        .map(() => countries[Math.floor(Math.random() * countries.length)]);

    return (
        <>
            <AmountInput
                type="number"
                value={Number.isNaN(amount) ? '' : amount}
                onChange={(event) => setAmount(Number.parseInt(event.target.value))}
            />
            <CardsContainer>
                {randomCountries.map((country) => (
                    <CountryCard key={nanoid()} country={country} />
                ))}
            </CardsContainer>
        </>
    );
}
