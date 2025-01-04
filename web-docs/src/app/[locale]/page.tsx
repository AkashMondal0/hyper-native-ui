import React from 'react';
import { Heading, Flex, Text, Button, Avatar, RevealFx, Arrow } from '@/once-ui/components';
import { baseURL, routes, renderContent } from '@/app/resources';
import { Mailchimp } from '@/components';
import { Posts } from '@/components/blog/Posts';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Projects } from '@/components/work/Projects';

export async function generateMetadata(
	{ params: { locale } }: { params: { locale: string } }
) {
	const t = await getTranslations();
	const { home } = renderContent(t);
	const title = home.title;
	const description = home.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/${locale}`,
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

export default function Home(
	{ params: { locale } }: { params: { locale: string } }
) {
	unstable_setRequestLocale(locale);
	const t = useTranslations();
	const { newsletter, home } = renderContent(t);
	return (
		<Flex
			maxWidth="m" fillWidth gap="xl"
			direction="column" alignItems="center">
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebPage',
						name: home.title,
						description: home.description,
						url: `https://${baseURL}`,
						image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
						publisher: {
							'@type': 'Person',
							name: `Akash Mondal`,
							image: {
								'@type': 'ImageObject',
								url: ``,
							},
						},
					}),
				}}
			/>
			<Flex
				fillWidth
				direction="column"
				paddingY="l" gap="m">
				<Flex
					direction="column"
					fillWidth maxWidth="s">
					<RevealFx
						translateY="4" fillWidth justifyContent="flex-start" paddingBottom="m">
						<Heading
							wrap="balance"
							variant="display-strong-l">
							{home.headline}
						</Heading>
					</RevealFx>
					<RevealFx
						translateY="8" delay={0.2} fillWidth justifyContent="flex-start" paddingBottom="m">
						<Text
							wrap="balance"
							onBackground="neutral-weak"
							variant="heading-default-xl">
							{home.subline}
						</Text>
					</RevealFx>
					<RevealFx translateY="12" delay={0.4}>
						<Flex fillWidth>
							<Button
								id="about"
								data-border="rounded"
								href={`/docs/installation`}
								variant="tertiary"
								size="m">
								<Flex
									gap="8"
									alignItems="center">
									Get Started
									<Arrow trigger="#about" />
								</Flex>
							</Button>
						</Flex>
					</RevealFx>
				</Flex>
			</Flex>
			<RevealFx translateY="16" delay={0.6}>
				<Projects range={[1, 1]} locale={locale} />
			</RevealFx>
			{routes['/docs'] && (
				<Flex
					fillWidth gap="24"
					mobileDirection="column">
					<Flex flex={1} paddingLeft="l">
						<Heading
							as="h2"
							variant="display-strong-xs"
							wrap="balance">
							Latest Components
						</Heading>
					</Flex>
					<Flex
						flex={3} paddingX="20">
						<Posts range={[4, 6]} columns="2" locale={locale} />
					</Flex>
				</Flex>
			)}
			{/* <Projects range={[2]} locale={locale} /> */}
			{newsletter.display && <Mailchimp newsletter={newsletter} />}
		</Flex>
	);
}
