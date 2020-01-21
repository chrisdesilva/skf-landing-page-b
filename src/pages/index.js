import React, { useEffect, useState, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Select from 'react-select';
import SEO from '../components/seo';
import '../components/layout.css';
import { programInfo } from '../programInfo';

const IndexPage = () => {
	const data = useStaticQuery(graphql`
		query {
			climbers: file(relativePath: { eq: "climbers.png" }) {
				childImageSharp {
					fluid {
						...GatsbyImageSharpFluid_withWebp
					}
				}
			}
			banner: file(relativePath: { eq: "tealbanner.png" }) {
				childImageSharp {
					fluid(maxWidth: 1800) {
						...GatsbyImageSharpFluid_withWebp
					}
				}
			}
			logo: file(relativePath: { eq: "skillsFund_logo.png" }) {
				childImageSharp {
					fluid {
						...GatsbyImageSharpFluid_withWebp
					}
				}
			}
			steps: file(relativePath: { eq: "FourSteps.png" }) {
				childImageSharp {
					fluid(maxWidth: 1800) {
						...GatsbyImageSharpFluid_withWebp
					}
				}
			}
			certificate: file(relativePath: { eq: "certificate.png" }) {
				childImageSharp {
					fluid {
						...GatsbyImageSharpFluid_withWebp
					}
				}
			}
			finishLine: file(relativePath: { eq: "finishLine.png" }) {
				childImageSharp {
					fluid {
						...GatsbyImageSharpFluid_withWebp
					}
				}
			}
			pull: file(relativePath: { eq: "pullTogether.png" }) {
				childImageSharp {
					fluid {
						...GatsbyImageSharpFluid_withWebp
					}
				}
			}
		}
	`);

	const [ isFormSubmitted, FormSubmitted ] = useState(false);
	const [ programLink, setProgramLink ] = useState('');
	const [ navBackground, setNavBackground ] = useState(false);
	const [ values, setValues ] = useState({
		email: '',
		stage: '',
		comments: ''
	});

	const [ IP, setIP ] = useState('');

	// Get IP address from client for Hubspot analytics
	async function fetchIP() {
		const res = await fetch('https://ip.nf/me.json');
		res.json().then((res) => setIP(res.ip.ip)).catch((err) => console.log(err));
	}

	useEffect(() => {
		fetchIP();
	});
	const navRef = useRef();

	navRef.current = navBackground;
	useEffect(() => {
		const handleScroll = () => {
			const show = window.scrollY > 300;
			if (navRef.current !== show) {
				setNavBackground(show);
			}
		};
		document.addEventListener('scroll', handleScroll);
		return () => {
			document.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		const url = `https://api.hsforms.com/submissions/v3/integration/submit/3871135/e1d66c17-474b-4ff4-a302-076223691c3f`;

		// hsCookie gets the data necessary to track Hubspot analytics
		const hsCookie = document.cookie.split(';').reduce((cookies, cookie) => {
			const [ name, value ] = cookie.split('=').map((c) => c.trim());
			cookies[name] = value;
			return cookies;
		}, {});

		//   field names are all set to match internal values on Hubspot
		const data = {
			fields: [
				{
					name: 'email',
					value: `${values.email}`
				},
				{
					name: 'next_steps',
					value: `${values.stage}`
				},
				{
					name: 'comments',
					value: `${values.comments}`
				}
			],
			context: {
				hutk: hsCookie.hubspotutk,
				pageUri: `https://apply.skills.fund`,
				pageName: `Landing Page B`,
				ipAddress: `${IP}`
			}
		};

		fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((response) => console.log('success', response))
			.catch((error) => console.log('error: ', error));
		FormSubmitted(true);
	};

	const handleProgramLink = (selectedOption) => {
		setProgramLink(selectedOption.value);
	};

	return (
		<div className="">
			<SEO title="Home" />
			<nav className="flex fixed w-full z-10 bg-white px-2">
				<div className="w-1/2 py-4 my-auto">
					<Img
						className={navBackground ? 'w-32 logo' : 'w-40 logo'}
						fluid={data.logo.childImageSharp.fluid}
						alt="Skills Fund logo"
					/>
				</div>
				<div
					className={
						navBackground ? 'py-4 w-1/2 flex justify-end show' : 'py-4 w-1/2 flex justify-end opacity-0'
					}
				>
					<a
						href="https://my.skills.fund/register"
						className="bg-secondary py-2 px-4 font-bold text-white text-center w-32 rounded-full cursor-pointer"
					>
						Apply Now
					</a>
				</div>
			</nav>
			<header className="flex flex-col items-center">
				<div className="flex flex-col items-center px-2 md:w-1/2 mt-32">
					<h1 className="font-normal text-center">Pay for Your Bootcamp</h1>
					<p className="text-center">
						Ready to apply for financing for your bootcamp? Choose your school to put you on the path to{' '}
						<strong className="text-secondary">long-term success.</strong>
					</p>
					<div className="flex flex-col md:flex-row items-center">
						<Select
							value={programLink.label}
							className="w-48 mb-4 md:mb-0 md:mr-4"
							onChange={handleProgramLink}
							options={programInfo}
							placeholder="School name"
						/>
						<a
							href="https://my.skills.fund/register"
							className={
								navBackground ? (
									'bg-secondary py-2 px-4 font-bold text-white text-center w-32 rounded-full cursor-pointer opacity-0'
								) : (
									'bg-secondary py-2 px-4 font-bold text-white text-center w-32 rounded-full cursor-pointer show'
								)
							}
						>
							Apply Now
						</a>
					</div>
					<a
						className={
							programLink ? (
								'mt-5 text-secondary underline show'
							) : (
								'mt-5 text-secondary underline opacity-0'
							)
						}
						href={programLink}
					>
						Learn More
					</a>
				</div>
			</header>
			<Img fluid={data.banner.childImageSharp.fluid} alt="Teal banner" />
			<section className="flex flex-col md:flex-row md:justify-around md:items-center ">
				<div className="md:w-1/3 p-4">
					<h2 className="font-normal md:text-4xl">Loans to Transform your Career</h2>
					<p>
						Already know which school you plan to attend? Get started on your application. Not quite sure
						which program you plan to attend? Compare your options{' '}
						<a href="https://skills.fund/students" className="text-secondary font-bold">
							here
						</a>.
					</p>
				</div>
				<div className="md:w-1/4">
					<Img fluid={data.climbers.childImageSharp.fluid} alt="Students on top of stacks of books" />
				</div>
			</section>
			<section className="flex flex-col items-center mt-8 px-2">
				<div className="md:w-1/3">
					<h2 className="font-normal text-center md:text-4xl">How Skills Fund Works</h2>
					<p>
						We make funding your education easier than you thought possible. Once you're approved for a
						Skills Fund loan, we work with your school so you can focus on your program.
					</p>
				</div>
				<div className="md:w-1/2 my-8">
					<Img fluid={data.steps.childImageSharp.fluid} alt="Four steps to financing your education" />
				</div>
			</section>
			<section className="py-8">
				<div
					className="yotpo yotpo-reviews-carousel"
					data-background-color="transparent"
					data-mode="top_rated"
					data-type="site"
					data-count="9"
					data-show-bottomline="1"
					data-autoplay-enabled="1"
					data-autoplay-speed="3000"
					data-show-navigation="1"
				>
					&nbsp;
				</div>
			</section>
			<section className="px-4 py-8 flex flex-col items-center bg-primary-dark text-white">
				<div className="flex flex-col items-center">
					<h2 className="font-normal text-center md:text-4xl">Benefits of Our Partner Schools</h2>
					<p className="md:w-1/2">
						We evaluate school quality and only partner with programs worth your time and money. Our
						education partners are committed to your success in the classroom and beyond. We look for:{' '}
					</p>
				</div>
				<div className="flex flex-col md:flex-row md:p-8 w-full">
					<div className="md:w-1/3 flex flex-col items-center">
						<div className="w-24 border-2 border-white rounded-full mb-4 bg-white">
							<Img fluid={data.certificate.childImageSharp.fluid} alt="Certificate of achievement" />
						</div>
						<p className="text-center">
							Excellent curriculum<br /> and instruction
						</p>
					</div>
					<div className="md:w-1/3 flex flex-col items-center">
						<div className="w-24 border-2 border-white rounded-full mb-4 bg-white">
							<Img fluid={data.pull.childImageSharp.fluid} alt="Four people using a pulley" />
						</div>
						<p className="text-center">
							Action-oriented <br /> career services{' '}
						</p>
					</div>
					<div className="md:w-1/3 flex flex-col items-center">
						<div className="w-24 border-2 border-white rounded-full mb-4 bg-white">
							<Img fluid={data.finishLine.childImageSharp.fluid} alt="Crossing the finish line" />
						</div>
						<p className="text-center">
							Impressive student <br /> outcomes
						</p>
					</div>
				</div>
			</section>
			<section className="flex flex-col items-center my-8 contact px-2">
				<h2 className="font-normal text-center md:text-4xl">Have questions? We can help.</h2>
				<form
					name="apply-skills-fund"
					method="post"
					className="flex flex-col items-center w-full md:w-1/2"
					onSubmit={handleFormSubmit}
				>
					<label htmlFor="email">Email address</label>
					<input
						className="mb-4 border-2 border-black p-2 w-full"
						type="email"
						id="email"
						name="email"
						placeholder="Enter your email address"
						required
						onChange={handleInputChange}
						onBlur={handleInputChange}
						value={values.email}
					/>
					<label htmlFor="stage">What are your next steps?</label>
					<select
						onChange={handleInputChange}
						onBlur={handleInputChange}
						className="mb-4 border-2 border-black p-2 w-full"
						id="stage"
						name="stage"
						value={values.stage}
					>
						<option>Select an option</option>
						<option value="Researching schools or programs">Researching schools or programs</option>
						<option value="Researching financing options">Researching financing options</option>
						<option value="Applying to a school">Applying to a school</option>
						<option value="Applying for financing">Applying for financing</option>
					</select>
					<label htmlFor="comments">Questions/Comments</label>
					<textarea
						className="mb-4 border-2 border-black p-2 h-24 w-full"
						id="comments"
						name="comments"
						placeholder="Enter any questions or comments for our customer trust team"
						onChange={handleInputChange}
						onBlur={handleInputChange}
						value={values.comments}
					/>
					{isFormSubmitted ? (
						<p>Thanks for contacting us! We'll be touch shortly!</p>
					) : (
						<input
							className="bg-secondary py-2 px-4 font-bold text-white rounded-full w-48 cursor-pointer"
							type="submit"
							value="Submit"
						/>
					)}
				</form>
			</section>
		</div>
	);
};

export default IndexPage;
