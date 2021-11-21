import Layout from '@theme/Layout';
import { FeatureDescription } from '../../helper-components/feature-description';
import { Feature } from '../../helper-components/feature';
import IconApiDocs from '../../assets/icon-api-docs.svg'
import IconDatabase from '../../assets/icon-database.svg'
import IconSecurity from '../../assets/icon-security.svg'
import IconWorld from '../../assets/icon-world.svg'
import IconFileStorage from '../../assets/icon-download-file.svg'
import IconScaling from '../../assets/icon-increase.svg'
import IconCode from '../../assets/icon-code.svg'
import IconTypeScript from '../../assets/icon-typescript.svg'
import IconRefresh from '../../assets/icon-refresh.svg'
import IconEnv from '../../assets/icon-env.svg'
import IconClock from '../../assets/icon-clock.svg'
import StepFeature from '../../helper-components/step-feature';
// /https://heroicons.com/

function LessCode() {
    return (
        <Layout title='Less Code'>
            <div id='tailwind'>
                <div className='grid place-items-center my-24 space-y-4'>
                    {/* <FeatureDescription
                        title="Write up to 95% Less Code"
                        description="EzBackend comes batteries included for the most common use cases so you don't have to constantly rewrite boilerplate code. It just works."
                    >
                    </FeatureDescription> */}
                    <div className="font-mono text-2xl tracking-tight ">
                        We compared a backend in Express/Postgres to EzBackend.
                    </div>
                    <div className="grid grid-cols-2 w-full items-center space-x-2">

                        <div className="font-monts text-right text-xl">
                            Each Backend Had:
                        </div>
                        <div >
                            <StepFeature delay={1000}>
                                <span className='text-purple'>Postgres</span> Database Connection
                            </StepFeature>
                            <StepFeature delay={2000}>
                                Two <span className='text-purple'>Model Schemas</span>
                            </StepFeature>
                            <StepFeature delay={3000}>
                                <span className='text-purple'>CRUD</span> Endpoints
                            </StepFeature>
                            <StepFeature delay={4000}>
                                Google <span className='text-purple'>Authentication</span>
                            </StepFeature>
                        </div>
                    </div>
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th>Framework</th>
                                <th>Lines of Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Express / Postgres</td>
                                <td>612</td>
                                {/* TODO: Get exact number */}
                            </tr>
                            <tr>
                                <td>EzBackend</td>
                                <td>30</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </Layout>
    )
}

export default LessCode