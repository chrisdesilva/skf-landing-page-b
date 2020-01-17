import React, { useState } from 'react';
import SEO from '../components/seo';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import animateScrollTo from 'animated-scroll-to';
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

	const handleFormSubmit = (e) => {
		e.preventDefault();
		FormSubmitted(true);
	};

	const handleProgramLink = (e) => {
		const link = e.target.value;
		window.open(link);
	};

	return (
		<div>
			<SEO title="Home" />
			<div className="flex justify-between">
				<div className="w-48 ml-4 mt-4">
					<Img fluid={data.logo.childImageSharp.fluid} alt="Skills Fund logo" />
				</div>
				<div className="mr-4 mt-4">
					<button className="bg-secondary py-2 px-4 font-bold text-white rounded-full w-48 cursor-pointer">
						Apply Now
					</button>
				</div>
			</div>
			<header className="flex flex-col items-center mt-8">
				<div className="flex flex-col items-center px-2 md:w-1/2">
					<h1 className="font-normal">Bootcamp Loans & Financing</h1>
					<p className="text-center">
						Ready to apply for financing and advance your career, without breaking the bank? Find the right
						program to put you on the path to <strong className="text-secondary">long-term success.</strong>
					</p>
					<select defaultValue="default" className="w-48" onChange={handleProgramLink}>
						<option value="default" disabled>
							Select A School
						</option>
						{programInfo.map((program) => (
							<option key={program.url} value={program.url}>
								{program.name}
							</option>
						))}
					</select>
				</div>
			</header>
			<Img fluid={data.banner.childImageSharp.fluid} alt="Teal banner" />
			<section className="flex flex-col md:flex-row md:justify-around md:items-center ">
				<div className="md:w-1/3 p-4">
					<h2 className="font-normal md:text-4xl">Financial Aid To Transform Your Career</h2>
					<p>
						Searching for a school or already accepted and ready to learn more about financing? We vet every
						accelerated learning program and only work with the best, so scroll through our list of partners
						and find out how our loans can help you reach your goals.
					</p>
				</div>
				<div className="md:w-1/4">
					<Img fluid={data.climbers.childImageSharp.fluid} alt="Students on top of stacks of books" />
				</div>
			</section>
			<section className="flex flex-col items-center mt-8">
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
				<div className="flex px-8">
					<div className="w-1/3 flex flex-col items-center">
						<div className="w-24 border-2 border-white rounded-full mb-4 bg-white">
							<Img fluid={data.certificate.childImageSharp.fluid} alt="Certificate of achievement" />
						</div>
						<p className="text-center">High quality of curriculum</p>
					</div>
					<div className="w-1/3 flex flex-col items-center">
						<div className="w-24 border-2 border-white rounded-full mb-4 bg-white">
							<Img fluid={data.pull.childImageSharp.fluid} alt="Four people using a pulley" />
						</div>
						<p className="text-center">Action-oriented career services </p>
					</div>
					<div className="w-1/3 flex flex-col items-center">
						<div className="w-24 border-2 border-white rounded-full mb-4 bg-white">
							<Img fluid={data.finishLine.childImageSharp.fluid} alt="Crossing the finish line" />
						</div>
						<p className="text-center">Impressive student outcomes</p>
					</div>
				</div>
			</section>
			<section className="flex flex-col items-center my-8 contact">
				<h2 className="font-normal text-center md:text-4xl">
					Ready to transform your career? Have more questions?
				</h2>
				<form className="flex flex-col items-center">
					<label htmlFor="email">Email address</label>
					<input
						className="mb-4 border-2 border-black p-2 w-64"
						type="email"
						id="email"
						placeholder="Enter your email address"
						required
					/>
					<label htmlFor="stage">What are your next steps?</label>
					<select defaultValue="default" className="mb-4 border-2 border-black p-2 w-64" id="stage">
						<option value="default">Select an option</option>
						<option>Researching different programs</option>
						<option>Researching different schools</option>
						<option>Applying to a school</option>
						<option>Applying for financing</option>
					</select>
					<label htmlFor="comments">Questions/Comments</label>
					<textarea
						className="mb-4 border-2 border-black p-2 h-24 w-64"
						id="comments"
						placeholder="Enter any questions or comments for our customer trust team"
					/>
					<input
						className="bg-secondary py-2 px-4 font-bold text-white rounded-full w-48 cursor-pointer"
						type="submit"
						value="Submit"
						onClick={handleFormSubmit}
					/>
				</form>
			</section>
		</div>
	);
};

export default IndexPage;
