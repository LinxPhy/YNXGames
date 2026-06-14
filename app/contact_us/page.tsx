'use client'
import { useState } from 'react'
import toast from "react-hot-toast";
import styles from './page.module.css'

export default function ContactUs() {

    const [loading, setLoading] = useState(false);

    async function HandleSubmit(e: any) {

        e.preventDefault();

        try {

            if (loading) return;
            setLoading(true);

            const form = e.target;
            const name = form.name.value;
            const email = form.email.value;
            const message = form.message.value;

            await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    message
                })
            });

            toast.success('Message sent successfully');
            form.reset()

        } catch (error) {

            toast.error('Something went wrong');

        } finally {
            setLoading(false);
        }

    }

    return (
        <div className={styles.contact_us}>
            <h1>Contact Us</h1>
            <p>If you have any questions, please don't hesitate to contact us.</p>

            <form onSubmit={HandleSubmit} className={styles.form}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" placeholder="Enter your name" required />
                </div>

                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" placeholder="Enter your email" required />
                </div>

                <div>
                    <label htmlFor="message">Message</label>
                    <textarea maxLength={100000} name="message" placeholder="Enter your message" rows={10} required></textarea>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    )

}