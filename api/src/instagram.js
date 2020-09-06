const router = require("express").Router();
const axios = require("axios");

router.get("/posts", async (req, res, next) => {
  try {
    const { body } = req;

    if (body.token && body.token === process.env.AUTH_INSTAGRAM) {
      const instagramRegExp = new RegExp(
        /<script type="text\/javascript">window\._sharedData = (.*)<\/script>/
      );

      const instagramResponse = await axios.get(
        "https://instagram.com/alienroom",
        {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
          },
        }
      );

      let regexMatchedData = instagramResponse.data
        .match(instagramRegExp)[1]
        .toString();

      /* remove ; from end of data string */
      regexMatchedData = regexMatchedData.replace('prod"};', 'prod"}');

      const json = JSON.parse(regexMatchedData);

      /**
       * controls how many posts are going to be shown:
       * @param {Number} start select post from latest to older, 0 = newest
       *
       * @param {Number} end posts to select from start, min = 1
       */
      const edges = json.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.splice(
        0,
        12
      );

      const photos = edges.map(({ node }) => ({
        url: `https://www.instagram.com/p/${node.shortcode}/`,
        thumbnailUrl: node.thumbnail_src,
        displayUrl: node.display_url,
        caption: node.edge_media_to_caption.edges[0].node.text,
      }));

      res.status(200).json({ posts: photos, number: photos.length });
    }
  } catch (e) {
    console.log(e);
    res.status(422).json({
      message: "Could not process req.",
      code: "invalid_req",
    });
  }
});

module.exports = router;
