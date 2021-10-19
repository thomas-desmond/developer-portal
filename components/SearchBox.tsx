import Head from 'next/head'

const SearchBox = (): JSX.Element => {

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://static.cloud.coveo.com/searchui/v2.7610/css/CoveoFullSearch.css" />
        <script src="https://static.cloud.coveo.com/searchui/v2.7610/js/CoveoJsSearch.Lazy.min.js"></script>
        <script src="https://static.cloud.coveo.com/searchui/v2.7610/js/templates/templates.js"></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
            document.addEventListener("DOMContentLoaded", function() {
              Coveo.SearchEndpoint.configureCloudV2Endpoint(
                "msitecorenetnonproductiontkunc72e",
                "xx6ca1b643-89fd-40f5-b02b-86943626079e"
              );       
              var root = document.getElementById("searchBox");
              Coveo.initSearchbox(root, "https://cms.sitecore.com/search");
            });
                        `,
          }}
        />
      </Head>

      <div className="coveo-search-section bg-red">
        <div className="CoveoAnalytics" data-search-hub="devPortalSearch"></div>
        <div id="searchBox" className="CoveoSearchbox">
        </div>
      </div>
    </>
  );
};

export default SearchBox;
