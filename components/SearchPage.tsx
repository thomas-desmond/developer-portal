// Global
import { TTailwindString } from 'tailwindcss-classnames';
import { classnames } from 'tailwindcss-classnames';
import { useId } from 'react-id-generator';
import Head from 'next/head'

type SearchPageProps = {
  className?: TTailwindString;
};

const SearchPage = ({ className }: SearchPageProps): JSX.Element => {
  /**
   *  React hook for unique IDs using react-unique-id.
   *  Avoid generating new ID on every rerender.
   */

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://static.cloud.coveo.com/searchui/v2.7610/css/CoveoFullSearch.css" />
        <script src="https://static.cloud.coveo.com/searchui/v2.7610/js/CoveoJsSearch.Lazy.min.js"></script>
        <script src="https://static.cloud.coveo.com/searchui/v2.7610/js/templates/templates.js"></script>

        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function () {
                Coveo.SearchEndpoint.configureCloudV2Endpoint(
                  "msitecorenetnonproductiontkunc72e",
                  "xx6ca1b643-89fd-40f5-b02b-86943626079e"
                );                
                Coveo.init(document.getElementById("search"));
              })
                        `,
          }}
        />
      </Head>


      <div id="search" className="CoveoSearchInterface" data-results-per-page="10">
        <div className="CoveoAnalytics" data-search-hub="devPortalSearch"></div>

        <div className="coveo-tab-section">
          <a className="CoveoTab" data-id="All" data-caption="All Content"></a>
        </div>
        <div className="coveo-search-section">
          <div className="CoveoSearchbox"></div>
        </div>
        <div className="coveo-main-section">
          <div className="coveo-facet-column">
            <div className="CoveoFacet" data-title="Type" data-field="@objecttype"></div>
          </div>
          <div className="coveo-results-column">
            <div className="CoveoResultList"></div>
            <div className="CoveoPager"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
