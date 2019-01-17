import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'

import Layout from '../layouts/index'
//import Layout from '../components/layout'

const BlogPost = ({ node }) => {
  if (!node.featureImage)
    return (
      <li>
        <Link to={node.slug}>{node.title}</Link>
        <div>{node.content.childMarkdownRemark.excerpt}</div>
      </li>
    )
  return (
    <li>
      <Link to={node.slug}>{node.title}</Link>
      <img src={node.featureImage.file.url} alt={node.title} />
      <div>{node.content.childMarkdownRemark.excerpt}</div>
    </li>
  )
}
const IndexPage = ({ data }) => (
  <Layout>
    <ul className="blog-post">
      {data.allContentfulBlog.edges.map(edge => (
        <BlogPost key={edge.node.slug} node={edge.node} />
      ))}
    </ul>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query pageQuery {
    allContentfulBlog(
      filter: { node_locale: { eq: "en-US" } }
      sort: { fields: [publishDate], order: DESC }
    ) {
      edges {
        node {
          title
          slug
          content {
            childMarkdownRemark {
              excerpt
            }
          }
          featureImage {
            file {
              url
            }
          }
        }
      }
    }
  }
`
