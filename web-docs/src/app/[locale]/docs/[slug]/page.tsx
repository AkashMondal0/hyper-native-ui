import ScrollToHash from '@/components/ScrollToHash';
import { notFound } from 'next/navigation'
import { CustomMDX } from '@/components/mdx'
import { getPosts } from '@/app/utils/utils'
import { Button, Flex, Heading, Text } from '@/once-ui/components'

import { baseURL } from '@/app/resources'
import { unstable_setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing';
import { formatDate } from '@/app/utils/formatDate'

interface BlogParams {
	params: {
		slug: string;
		locale: string;
	};
}

export async function generateStaticParams() {
	const locales = routing.locales;

	// Create an array to store all posts from all locales
	const allPosts: { slug: string; locale: string }[] = [];

	// Fetch posts for each locale
	for (const locale of locales) {
		const posts = getPosts(['src', 'app', '[locale]', 'docs', 'posts', locale]);
		allPosts.push(...posts.map(post => ({
			slug: post.slug,
			locale: locale,
		})));
	}

	return allPosts;
}

export function generateMetadata({ params: { slug, locale } }: BlogParams) {
	let post = getPosts(['src', 'app', '[locale]', 'docs', 'posts', locale]).find((post) => post.slug === slug)

	if (!post) {
		return
	}

	let {
		title,
		publishedAt: publishedTime,
		summary: description,
		image,
	} = post.metadata;
	let ogImage = image
		? `https://${baseURL}${image}`
		: `https://${baseURL}/og?title=${title}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime,
			url: `https://${baseURL}/${locale}/docs/${post.slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	}
}

export default function Slug({ params }: BlogParams) {
	unstable_setRequestLocale(params.locale);
	let post = getPosts(['src', 'app', '[locale]', 'docs', 'posts', params.locale]).find((post) => post.slug === params.slug)

	if (!post) {
		notFound()
	}

	return (
		<Flex as="section"
			fillWidth maxWidth="xs"
			direction="column"
			gap="m">
			{/* <script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'BlogPosting',
						headline: post.metadata.title,
						datePublished: post.metadata.publishedAt,
						dateModified: post.metadata.publishedAt,
						description: post.metadata.summary,
						image: post.metadata.image
							? `https://${baseURL}${post.metadata.image}`
							: `https://${baseURL}/og?title=${post.metadata.title}`,
							url: `https://${baseURL}/${params.locale}/blog/${post.slug}`,
						author: {
							'@type': 'Person',
							name: person.name,
						},
					}),
				}}
			/> */}
			<Button
				href={`/${params.locale}/docs`}
				variant="tertiary"
				size="s"
				prefixIcon="chevronLeft">
				Docs
			</Button>
			<Heading
				variant="display-strong-s">
				{post.metadata.title}
			</Heading>
			<Flex
				gap="12"
				alignItems="center">
				<Text
					variant="body-default-s"
					onBackground="neutral-weak">
					{formatDate(post.metadata.publishedAt)}
				</Text>
			</Flex>
			<Flex
				as="article"
				direction="column"
				fillWidth>
				<CustomMDX source={post.content} />
			</Flex>
			<ScrollToHash />
		</Flex>
	)
}