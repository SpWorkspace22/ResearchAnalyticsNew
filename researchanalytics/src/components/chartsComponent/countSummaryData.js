export default function CountSummaryData({countSummary}){
    return(
        <div className="ui four statistics shadow rounded-4 p-4">
            <div className="ui olive inverted statistic">
                <div className="value">
                    <i class="user icon"></i>  {countSummary.authors}
                </div>
                <div className="label mt-1 text-dark">
                    Authors
                </div>
            </div>
            <div className="ui brown inverted statistic">
                <div className="value">
                    <i class="file alternate icon"></i> {countSummary.articles}
                </div>
                <div className="label mt-1 text-dark">
                    Articles
                </div>
            </div>
            <div className="ui blue inverted statistic">
                <div className="value">
                    <i class="file icon"></i> {countSummary.platforms}
                </div>
                <div className="label mt-1 text-dark">
                    Platforms
                </div>
            </div>
        </div>
    );
}