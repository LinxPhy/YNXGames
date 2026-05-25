'use client'
import { useEffect, useState } from "react";
import styles from '@/app/components/sidebar/sidebar.module.css'
import { Range, getTrackBackground } from "react-range";

export default function TwoRange() {

    const [values, setValues] = useState([2015, 2023]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <div style={{ height: 60, width: "90%" }} />
        );
    }

    return (
        <div className={styles.range} >

            <div style={{ visibility: "hidden" }}>Test</div>

            <Range
                label="Select your value"
                step={1}
                min={2011}
                max={2026}
                values={values}
                onChange={(values) => setValues(values)}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: "6px",
                            width: "90%",
                            margin: "0 auto",
                            padding: "0",
                            background: getTrackBackground({
                                values,
                                colors: ["var(--dark)", "var(--primary)", "var(--dark)"],
                                min: 2011,
                                max: 2026
                            })

                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div
                        {...props}
                        key={props.key}
                        style={{
                            ...props.style,
                            height: "16px",
                            width: "16px",
                            borderRadius: "50%",
                            backgroundColor: "var(--primary)",
                        }}
                    />
                )}
            />

            <div className={styles.values}>
                <p>{values[0]}</p>
                <p>{values[1]}</p>
            </div>

        </div>
    )

}