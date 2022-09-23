import React from "react";
import Layout from "@theme/Layout";
import BGCircle from "@site/static/img/purpleBlurredCircle.png";
import BGCircleCommunity from "@site/static/img/samples/purplePinkBlur.png";
import PlusIcon from "@site/static/img/svgIcons/plus.svg";
import {
  dfinityToolingItems,
  communityToolingItems,
} from "@site/src/components/Common/toolingItems";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import clsx from "clsx";
import Head from "@docusaurus/Head";
import { useQueryParam } from "@site/src/utils/use-query-param";
import LinkIcon from "@site/static/img/svgIcons/link.svg";
import Link from "@docusaurus/Link";

function Samples(): JSX.Element {
  resetNavBarStyle();
  const [numberOfItems, setNumberOfItems] = React.useState(40);
  const [numberOfCommunityItems, setNumberOfCommunityItems] =
    React.useState(40);
  const [queryTag, setQueryTag, queryTagInitialized] = useQueryParam("tag");

  let filteredDfinityTools = dfinityToolingItems;
  let filteredCommunityTools = communityToolingItems;
  let totalToolsNumber =
    filteredCommunityTools.length + filteredDfinityTools.length;
  const tags = Object.keys(
    [...dfinityToolingItems, ...communityToolingItems].reduce((tags, p) => {
      if (!p.tags) return tags;
      for (const tag of p.tags) {
        tags[tag] = true;
      }
      return tags;
    }, {})
  );
  if (queryTagInitialized && queryTag?.length > 0) {
    filteredDfinityTools = dfinityToolingItems.filter((p) =>
      p.tags.find((tag) => tag == queryTag)
    );

    filteredCommunityTools = communityToolingItems.filter((p) =>
      p.tags.find((tag) => tag == queryTag)
    );
    totalToolsNumber =
      filteredCommunityTools.length + filteredDfinityTools.length;
  }

  function ToolCard({ title, image, description, tags, links }) {
    return (
      <div className="relative rounded-xl bg-white h-full" key={title}>
        <img
          src={image}
          className="w-full h-40 object-cover block rounded-t-xl"
          alt=""
        />
        <div className="h-fit p-6 flex flex-col relative">
          <div className="absolute flex h-8 -top-4 tw-title-navigation-on-page text-black capitalize px-3 py-1 rounded-full items-center bg-white-60 backdrop-blur-2xl">
            <span>{tags[0]}</span>
          </div>
          <span className="tw-heading-6 my-2 mr-3">{title}</span>

          <p className="tw-paragraph-sm h-full text-black-60 mb-0 overflow-hidden">
            {description}
          </p>
          <div className="flex flex-row gap-1 flex-wrap my-3">
            {tags.map((tag) => (
              <button
                key={tag}
                className="tw-title-navigation-on-page font-circular capitalize text-infinite bg-white rounded-full border-infinite border-solid border py-1 px-2 hover:no-underline hover:bg-infinite hover:border-infinite hover:text-white transition-colors"
                onClick={() => setQueryTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className={"flex flex-row gap-2 mt-3"}>
            {links.map((link) => (
              <Link
                className="inline-flex relative border-solid border-black-30 border rounded-full p-1.5 -top-1 hover:text-white hover:border-infinite hover:bg-infinite"
                to={link}
              >
                <LinkIcon className={"h-6 w-6"} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout
      title={"Tooling Resources"}
      description={
        "Dive into tool projects from official or from the open source community, ranging from plugins to CLIs, And use them to improve and ease your development journey."
      }
    >
      <Head>
        <meta
          property="og:image"
          content={
            "https://internetcomputer.org/img/shareImages/share-tooling.jpeg"
          }
        />
        <meta
          name="twitter:image"
          content={
            "https://internetcomputer.org/img/shareImages/share-tooling.jpeg"
          }
        />
        <title>Tooling Resources</title>
      </Head>
      <main className="w-full overflow-hidden">
        <AnimateSpawn variants={transitions.container}>
          <section className="max-w-page w-9/10 mx-auto relative mt-20 md:mt-40 lg:mb-30">
            <img
              className="absolute pointer-events-none max-w-none w-[800px] -right-[320px] top-[-100px] md:w-[1500px]  md:right-[-700px] 2xl:left-1/2 translate-x-[200px] md:top-[-350px] z-[-1000]"
              src={BGCircle}
              alt=""
            />
            <div className="max-w-page md:w-10/12 md:ml-1/12 mb-12 md:mb-16 md:pr-2/10">
              <motion.p
                variants={transitions.item}
                className="tw-heading-3 md:tw-heading-2"
              >
                Tooling Resources
              </motion.p>
              <motion.p
                variants={transitions.item}
                className="tw-lead-sm md:tw-lead mb-0"
              >
                Dive into tool projects from official or from the open source
                community, ranging from plugins to CLIs, And use them to improve
                and ease your development journey.
              </motion.p>
            </div>

            <motion.div
              className="max-w-page md:w-10/12 md:ml-1/12 flex gap-10 md:gap-20 flex-col md:flex-row"
              variants={transitions.item}
            >
              <div className="flex flex-col items-start">
                <div className="flex items-center mb-5">
                  <span className="tw-heading-5 mr-2">Tools</span>
                  <span className="tw-paragraph rounded-xl bg-white px-2 py-0.5">
                    {totalToolsNumber}
                  </span>
                </div>

                <div className="flex gap-2 flex-wrap flex-1 items-center">
                  <button
                    className={clsx(
                      "inline-block bg-white font-circular rounded-xl border border-infinite border-solid tw-title-navigation py-[10px] px-4 capitalize hover:no-underline hover:bg-infinite hover:border-infinite hover:text-white transition-colors",
                      !queryTag
                        ? "text-white bg-infinite"
                        : "text-black bg-white"
                    )}
                    onClick={() => setQueryTag(undefined)}
                  >
                    All Tools
                  </button>
                  {tags.map((tag) => (
                    <button
                      className={clsx(
                        "inline-block bg-white font-circular rounded-xl border border-infinite border-solid tw-title-navigation py-[10px] px-4 capitalize hover:no-underline hover:bg-infinite hover:border-infinite hover:text-white transition-colors",
                        tag === queryTag
                          ? "text-white bg-infinite"
                          : "text-black bg-white"
                      )}
                      key={tag}
                      onClick={() => setQueryTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={transitions.item}
              className="mt-12 md:ml-1/12"
            >
              <p className="tw-heading-6 md:tw-heading-5">Featured tools</p>

              {filteredDfinityTools.length === 0 && (
                <p className="tw-paragraph text-black-60">
                  No featured tools available
                </p>
              )}
            </motion.div>
            <motion.div
              variants={transitions.item}
              className={clsx(
                "relative mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4 auto-rows-fr transition-opacity",
                filteredDfinityTools.length === 0 ? "" : "mt-11 mb-20"
              )}
            >
              {filteredDfinityTools.slice(0, numberOfItems).map((tool) => (
                <ToolCard
                  title={tool.title}
                  image={tool.image}
                  description={tool.description}
                  tags={tool.tags}
                  links={tool.links}
                />
              ))}
            </motion.div>
            {filteredDfinityTools.length > numberOfItems && (
              <div
                className="flex mt-20 items-center justify-center tw-heading-6 text-infinite hover:text-black-60"
                onClick={() => setNumberOfItems(numberOfItems + 40)}
              >
                <div className="inline-block mr-2 h-6">
                  <PlusIcon />
                </div>
                <p className="mb-0">Load more</p>
              </div>
            )}

            <motion.div
              variants={transitions.item}
              className="mt-10 flex flex-col md:flex-row items-center relative"
            >
              <img
                className="absolute pointer-events-none max-w-none w-[800px] -right-[320px] top-[-100px] md:w-[1500px]  md:right-[-700px] 2xl:left-1/2 translate-x-[200px] md:top-[-350px] z-[-1000]"
                src={BGCircleCommunity}
                alt=""
              />
              <div className="md:w-2/3 md:ml-1/12">
                <p className="md:w-6/10 tw-heading-6 md:tw-heading-5">
                  Community tools
                </p>
                <p className="md:w-6/10 tw-paragraph">
                  The Internet Computer has many tools built by the community.
                  Check out the repos and get building!
                </p>
                {/*<p className="inline-flex tw-title-navigation-on-page border-black-60 border-2 border-solid py-2 px-3 rounded-xl hover:text-white hover:bg-infinite transition-colors">
                  Submit your Repo
                </p>*/}
              </div>
              <div className="w-full md:w-4/10 md:mr-1/12">
                <p className="mt-6 md:mt-0 tw-paragraph-sm text-black-60">
                  Disclamer: Please use the following tools at your own risk and
                  always do your own research.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={transitions.item}
              className="relative my-14 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4 auto-rows-fr transition-opacity"
            >
              {filteredCommunityTools
                .slice(0, numberOfCommunityItems)
                .map((tool) => (
                  <ToolCard
                    title={tool.title}
                    image={tool.image}
                    description={tool.description}
                    tags={tool.tags}
                    links={tool.links}
                  />
                ))}
            </motion.div>
            {filteredCommunityTools.length > numberOfCommunityItems && (
              <div
                className="flex mt-20 items-center justify-center tw-heading-6 text-infinite hover:text-black-60"
                onClick={() =>
                  setNumberOfCommunityItems(numberOfCommunityItems + 40)
                }
              >
                <div className="inline-block mr-2 h-6">
                  <PlusIcon />
                </div>
                <p className="mb-0">Load more</p>
              </div>
            )}
          </section>
        </AnimateSpawn>
      </main>
    </Layout>
  );
}

export default Samples;
