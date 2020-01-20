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

	function encode(data) {
		return Object.keys(data).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
	}
	const [ isFormSubmitted, FormSubmitted ] = useState(false);
	const [ programLink, setProgramLink ] = useState('');
	const [ navBackground, setNavBackground ] = useState(false);
	const [ values, setValues ] = useState({
		email: '',
		stage: '',
		comments: ''
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
		const form = e.target;
		fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: encode({
				'form-name': form.getAttribute('name'),
				...values
			})
		})
			.then(
				setValues({
					email: '',
					stage: '',
					comments: ''
				})
			)
			.catch((error) => alert(error));
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
					<h1 className="font-normal text-center">Pay for your Bootcamp</h1>
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
				<div className="flex flex-col items-center justify-center md:flex-row md:px-8">
					<div className="md:w-1/3 flex flex-col items-center">
						<div className="w-24 border-2 border-white rounded-full mb-4 bg-white">
							<Img fluid={data.certificate.childImageSharp.fluid} alt="Certificate of achievement" />
						</div>
						<p className="text-center">High quality of curriculum</p>
					</div>
					<div className="md:w-1/3 flex flex-col items-center">
						<div className="w-24 border-2 border-white rounded-full mb-4 bg-white">
							<Img fluid={data.pull.childImageSharp.fluid} alt="Four people using a pulley" />
						</div>
						<p className="text-center">Action-oriented career services </p>
					</div>
					<div className="md:w-1/3 flex flex-col items-center">
						<div className="w-24 border-2 border-white rounded-full mb-4 bg-white">
							<Img fluid={data.finishLine.childImageSharp.fluid} alt="Crossing the finish line" />
						</div>
						<p className="text-center">Impressive student outcomes</p>
					</div>
				</div>
			</section>
			<section className="flex flex-col items-center my-8 contact px-2">
				<h2 className="font-normal text-center md:text-4xl">
					Ready to transform your career? Have more questions?
				</h2>
				<form
					name="apply-skills-fund"
					method="post"
					data-netlify="true"
					data-netlify-honeypot="bot-field"
					className="flex flex-col items-center w-full md:w-1/2"
					onSubmit={handleFormSubmit}
				>
					<input type="hidden" name="form-name" value="apply-skills-fund" />
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
						defaultValue="default"
						className="mb-4 border-2 border-black p-2 w-full"
						id="stage"
						name="stage"
						value={values.stage}
					>
						<option value="default">Select an option</option>
						<option>Researching different programs</option>
						<option>Researching different schools</option>
						<option>Applying to a school</option>
						<option>Applying for financing</option>
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
							onClick={handleFormSubmit}
						/>
					)}
				</form>
			</section>
		</div>
	);
};

export default IndexPage;
