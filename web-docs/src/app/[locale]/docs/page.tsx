import { Flex, Heading } from '@/once-ui/components';
import { baseURL } from '@/app/resources'
import { unstable_setRequestLocale } from 'next-intl/server';
import { Posts } from '@/components/blog/Posts';

export async function generateMetadata(
	{ params: { locale } }: { params: { locale: string } }
) {
	const title = `Docs HyperNative Ui`;
	const description = ``;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/${locale}/docs`,
			images: [
				{
					url: ogImage,
					alt: title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	};
}

export default function Docs(
	{ params: { locale } }: { params: { locale: string } }
) {
	unstable_setRequestLocale(locale);
	return (
		<Flex
			fillWidth maxWidth="s"
			direction="column">
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'Blog',
						headline: 'Docs HyperNative Ui',
						description: 'Docs HyperNative Ui',
						url: `https://${baseURL}/blog`,
						// image: `${baseURL}/og?title=${encodeURIComponent(blog.title)}`,
						author: {
							'@type': 'Person',
							name: 'akashmondal0',
							image: {
								'@type': 'ImageObject',
								url: ``,
							},
						},
					}),
				}}
			/>
			<Heading
				marginBottom="l"
				variant="display-strong-s">
				Docs
			</Heading>
			<Flex
				fillWidth flex={1} direction="column">
				<Posts range={[1, 100]} locale={locale} thumbnail />
				{/* <Posts range={[3, 4]} columns="2" locale={locale} /> */}
				{/* <Posts range={[1]} locale={locale} thumbnail /> */}
				{/* <Posts range={[2]} locale={locale} thumbnail /> */}
			</Flex>
		</Flex>
	);
}