'use client';

import React, { FormEvent, useState, useEffect } from 'react';
import ArrowLongLeft from '../../ui/ArrowLongLeft';
import Link from 'next/link';
import { FormSection, NewUser } from '@/app/utils/enums/sign-up';
import {
  setName,
  setUsername,
  setEmail,
  setBirthDay,
  setBirthMonth,
  setBirthYear,
  setPassword,
  setConfirmPassword,
} from '@/app/utils/functions/sign-up';

import styles from './SignUpForm.module.scss';
import { useRouter } from 'next/navigation';
import CircularIndeterminate from '../../ui/CircularInterminate';

function SignUpForm() {
  const router = useRouter();

  const [data, setData] = useState({
    name: '',
    username: '',
    email: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    password: '',
    confirmPassword: '',
  });

  const [emailError, setEmailError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);

  const [submittingIsLoading, setSubmittingIsLoading] = useState(false);
  const [msgError, setMsgError] = useState<string | null>(null);
  const [currentPart, setCurrentPart] = useState(FormSection.FIRST_SECTION);
  const [btnNext, setBtnNext] = useState(false);
  const [btnSubmit, setBtnSubmit] = useState(false);

  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 100; // You can adjust the range as needed
  const endYear = currentYear;

  const days = Array.from({ length: 32 }, (_, index) => index);
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  ); // Generate an array of years

  useEffect(() => {
    if (
      data.name !== '' &&
      data.email !== '' &&
      data.birthDay !== '' &&
      data.birthMonth !== '' &&
      data.birthYear !== ''
    ) {
      setBtnNext(true);
    } else {
      setBtnNext(false);
    }

    if (
      data.name !== '' &&
      data.email !== '' &&
      data.birthDay !== '' &&
      data.birthMonth !== '' &&
      data.birthYear !== '' &&
      data.password !== '' &&
      data.confirmPassword !== '' &&
      data.username !== ''
    ) {
      setBtnSubmit(true);
    } else {
      setBtnSubmit(false);
    }
  }, [data]);

  function nextHandler() {
    if (currentPart === FormSection.FIRST_SECTION)
      setCurrentPart(FormSection.SECOND_SECTION);
  }

  function previousHandler() {
    if (currentPart === FormSection.SECOND_SECTION)
      setCurrentPart(FormSection.FIRST_SECTION);
  }

  function emailInputHandler(event: any) {
    setEmail(event, data, setData);
  }

  async function registerUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittingIsLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.text();

        if (error === NewUser.EMAIL_EXIT) {
          setEmailError(NewUser.EMAIL_EXIT);
          setMsgError(NewUser.EMAIL_EXIT);
        }

        if (error === NewUser.USERNAME_EXIT) {
          setMsgError(NewUser.USERNAME_EXIT);
          setUsernameError(NewUser.USERNAME_EXIT);
          setEmailError(null);
        }

        if (error === NewUser.USERNAME_INVALID) {
          setUsernameError(NewUser.USERNAME_INVALID);
          setMsgError(NewUser.USERNAME_INVALID);
          setEmailError(null);
        }

        throw new Error(error);
      }

      setEmailError(null);
      setMsgError(null);
      router.push('/login');
    } catch (error) {
      console.error(error);
    }

    setSubmittingIsLoading(false);
  }

  return (
    <div className={styles.container}>
      {currentPart === FormSection.SECOND_SECTION && (
        <div className={styles.previous} onClick={previousHandler}>
          <ArrowLongLeft className={styles.icon} />
          <p>Previous</p>
        </div>
      )}

      <h1 className={styles.heading}>Create your account</h1>

      <form action="" onSubmit={registerUser} className={styles.form}>
        <div
          className={`${styles['part-1']} ${
            currentPart !== FormSection.FIRST_SECTION ? `${styles.hidden}` : ''
          }`}
        >
          <div className={styles['input-container']}>
            <label htmlFor="name"></label>
            <input
              name="name"
              type="text"
              placeholder="Name"
              required
              className={styles.name}
              onChange={(event) => setName(event, data, setData)}
            />
          </div>

          <div className={styles['input-container']}>
            <label htmlFor="email"></label>
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className={`${styles.email} ${
                emailError && `${styles['input-error']}`
              }`}
              onChange={(event) => emailInputHandler(event)}
            />
            {emailError && <p className={styles.errorMsg}>{emailError}</p>}
          </div>

          <div className={styles['input-container']}>
            <h2 className={styles.subheading}>Date of birth</h2>
            <p className={styles.text}>
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else.
            </p>

            <div className={styles['birth-date']}>
              <div className={styles['input-date-container']}>
                <label htmlFor="month">Month</label>
                <select
                  name="month"
                  id=""
                  placeholder="Month"
                  required
                  onChange={(event) => setBirthMonth(event, data, setData)}
                >
                  <option value=""></option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>

              <div className={styles['input-date-container']}>
                <label htmlFor="daySelect">Day</label>
                <select
                  id="daySelect"
                  required
                  onChange={(event) => setBirthDay(event, data, setData)}
                >
                  <option value=""></option>
                  {days.map((day) => (
                    <option key={day} value={day.toString()}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles['input-date-container']}>
                <label htmlFor="yearSelect">Year</label>
                <select
                  id="yearSelect"
                  placeholder="Year"
                  required
                  onChange={(event) => setBirthYear(event, data, setData)}
                >
                  <option value=""></option>
                  {years.map((year) => (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${styles['part-2']} ${
            currentPart !== FormSection.SECOND_SECTION ? `${styles.hidden}` : ''
          }`}
        >
          <div className={styles['input-container']}>
            <label htmlFor="username"></label>
            <input
              type="text"
              name="username"
              required
              className={`${styles.username} ${
                usernameError && `${styles['input-error']}`
              }`}
              placeholder="Username"
              onChange={(event) => setUsername(event, data, setData)}
            />
          </div>

          <div className={styles['input-container']}>
            <label htmlFor="password"></label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={(event) => setPassword(event, data, setData)}
            />
          </div>

          <div className={styles['input-container']}>
            <label htmlFor="confirm"></label>
            <input
              type="password"
              name="confirm"
              placeholder="Confirm Password"
              required
              onChange={(event) => setConfirmPassword(event, data, setData)}
            />
          </div>
        </div>

        {currentPart === FormSection.SECOND_SECTION && (
          <>
            {msgError && <p className={styles.errorMsg}>{msgError}</p>}
            <button
              className={styles.submit}
              disabled={!btnSubmit || submittingIsLoading}
            >
              {submittingIsLoading && (
                <CircularIndeterminate className={styles.loading} />
              )}
              Submit
            </button>
          </>
        )}
      </form>
      {currentPart === FormSection.FIRST_SECTION && (
        <button
          className={styles.next}
          onClick={nextHandler}
          disabled={!btnNext}
        >
          Next
        </button>
      )}

      <div className={styles.signin}>
        <p>Already have an account?</p>
        <Link href={'/login'}>Sign in</Link>
      </div>
    </div>
  );
}

export default SignUpForm;
