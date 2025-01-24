import React, { useState } from 'react';
import moment from 'moment';

function Cards(props) {
  const [expandedLaunch, setExpandedLaunch] = useState(null); // Track expanded mission
  const toggleExpand = (missionName) => {
    if (expandedLaunch === missionName) {
      setExpandedLaunch(null); // Collapse if already expanded
    } else {
      setExpandedLaunch(missionName); // Expand the clicked mission
    }
  };

  return (
    <>
      <div className="card-list">
        {props.filteredLaunches.map((launch, index) => (
          <div
            key={launch.mission_name + index}
            style={{ animationDelay: `${index * 0.1}s` }}
            className="card"
          >
            <div className="card-header">
              <h2>{launch.mission_name}</h2>
              <span
                className={`status ${
                  launch.upcoming
                    ? 'upcoming'
                    : launch.launch_success
                    ? 'success'
                    : 'failed'
                }`}
              >
                {launch.upcoming
                  ? 'upcoming'
                  : launch.launch_success
                  ? 'success'
                  : 'failed'}
              </span>
            </div>
            <div className="card-footer">
              <button
                className="view-button"
                onClick={() => toggleExpand(launch.mission_name)}
              >
                {expandedLaunch === launch.mission_name ? 'HIDE' : 'VIEW'}
              </button>
            </div>

            {expandedLaunch === launch.mission_name && (
              <div className="card-details">
                <p>
                  <small>
                    {moment(launch.launch_date_utc).fromNow()} |{' '}
                    <a
                      href={launch.links.article_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Article
                    </a>
                    |{' '}
                    <a
                      href={launch.links.video_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Video
                    </a>
                  </small>
                </p>
                <div className="details-body">
                  {launch.links.mission_patch_small ? (
                    <img
                      src={launch.links.mission_patch_small}
                      alt={`${launch.mission_name} patch`}
                      className="mission-patch"
                    />
                  ) : (
                    'no image yet'
                  )}
                  <p>
                    {launch.details || 'No details available for this mission.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Cards;
