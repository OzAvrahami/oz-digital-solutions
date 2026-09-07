'use client'

import { useEffect, useState } from 'react'
import { flowCopy } from '@/content/flow'
import type { Locale } from '@/lib/i18n'
import Icon from './Icon'
import DesignText from './DesignText'
import { usePreferences } from './Preferences'

const paths = ['M140 106H220Q280 106 280 176V218', 'M453 124H350Q280 124 280 185V218', 'M280 250V288Q280 331 218 331H130', 'M280 250V340Q280 365 350 365H453']

export default function Workflow({ locale }: { locale: Locale }) {
  const t = flowCopy[locale]
  const { paused, systemReduced, toggleMotion } = usePreferences()
  const [step, setStep] = useState(-1)
  const running = step >= 0 && step < 4 && !paused
  useEffect(() => {
    if (!running) return
    const timer = window.setTimeout(() => setStep(value => value + 1), 1150)
    return () => window.clearTimeout(timer)
  }, [step, running])
  const active = (steps: number[]) => running && steps.includes(step) ? ' active' : ''
  return <div className={`flow-scene${running ? ' running' : ''}`} role="group" aria-label={t.sceneTitle}>
    <div className="scene-top"><span>THE CONNECTED BUSINESS</span><span>{t.sceneDemo}<button className="scene-motion" disabled={systemReduced} title={systemReduced ? (locale === 'he' ? 'התנועה נעצרה בהתאם להגדרות המכשיר.' : 'Motion is paused by your device preference.') : undefined} aria-label={paused ? t.motionResume : t.motionPause} aria-pressed={paused} onClick={toggleMotion}><Icon name={paused ? 'play' : 'pause'} /></button></span></div><div className="scene-halo" aria-hidden="true" />
    <svg className="flow-lines" viewBox="0 0 560 425" preserveAspectRatio="none" aria-hidden="true">{paths.map(d => <path key={d} d={d} />)}{paths.map(d => <path key={`beam-${d}`} className="flow-beam" d={d} />)}</svg>
    <div className="flow-node node-website"><div className="mini-browser-top"><div className="browser-dots"><i /><i /><i /></div><span>your-business.com</span></div><div className="mini-site-body"><div className="mini-site-title"><DesignText>{t.yourSite}</DesignText></div><div className="mini-site-lines"><i /><i /></div><span className="mini-site-btn">{t.miniCta}</span></div></div>
    <div className={`flow-node node-input${active([0, 3])}`}><div className="node-title"><span className="node-icon"><Icon name="inbox" /></span>{t.newLead}</div><div className="input-detail"><span className="fake-avatar">{locale === 'he' ? 'ד' : 'D'}</span><span>{t.leadName} · {t.leadDetail}</span></div><span className="mini-pill">{t.leadTag}</span></div>
    <div className={`center-hub${active([1, 3])}`} aria-hidden="true"><span className="hub-orbit" /><span className="wordmark">oz.</span><span className="hub-label">{t.aiLabel}</span></div><div className="scene-chip">{t.connected}</div>
    <div className={`flow-node node-message${active([2, 3])}`}><div className="node-title"><span className="node-icon"><Icon name="message" /></span>{t.autoReply}</div><p className="message-text"><DesignText>{t.replyText}</DesignText></p></div>
    <div className={`flow-node node-database${active([1, 3])}`}><div className="node-title"><span className="node-icon"><Icon name="layers" /></span>{t.crm}</div><div className="db-line"><span>{t.crmDetail}</span><Icon name="check" /></div><div className="db-line"><span>{t.crmTag}</span><span className="db-progress"><i /></span></div></div>
    <p className="flow-status" aria-live="polite">{step >= 0 ? t.flowSteps[Math.min(step, 3)] : ''}</p><div className="scene-control"><button className="run-flow" disabled={running} onClick={() => setStep(paused ? 4 : 0)}><Icon name="play" /><span>{step < 0 ? t.run : t.runAgain}</span></button><small>{t.runHint}</small></div>
  </div>
}
