---
layout: post  
title: "Tweetz Release 1.2.4 - Screen Off Detection "  
...

This release fixes a long standing problem where tweetz wakes up the screen after it automatically shuts off as directed by the user's power settings. Just determining what caused it to wake up was a mystery. Eventually, I determined that the web requests to twitter that tweetz initiates were the culprit. 

Figuring out when the screen powers down was something of a trial. There are dozens of posts about how to this. I tried them all only to discover none of them worked reliably. I was convinced it wasn't possible until I stumbled upon some code in an old Microsoft Application that contained the secret sauce.

I've been testing this on several computers for a couple of weeks now and it hasn't once triggered a monitor wakeup, so I think maybe I have solved it.

[Download Link](https://github.com/mike-ward/tweetz-desktop/releases/latest)

Thanks to everyone who donates. I know I don't kick out updates often to this program, but I do try to keep it current with changes introduced by twitter (like the recent 280 character enhancement).

And Merry Christmas, if that's your thing.

---

For developers out there, here's the relevant code. You can also get it from tweetz's source code under the `PowerManagement` folder. Much of this comes from the MS Application I mentioned earlier.

```
using System;
using System.Runtime.InteropServices;

namespace tweetz5.Utilities.PowerManagment
{
    internal static class PowerManagementNativeMethods
    {
        #region Power Management

        internal const uint PowerBroadcastMessage = 536;
        internal const uint PowerSettingChangeMessage = 32787;
        internal const uint ScreenSaverSetActive = 0x0011;
        internal const uint UpdateInFile = 0x0001;
        internal const uint SendChange = 0x0002;

        // This structure is sent when the PBT_POWERSETTINGSCHANGE message is sent.
        // It describes the power setting that has changed and 
        // contains data about the change.
        [StructLayout(LayoutKind.Sequential, Pack = 4)]
        public struct PowerBroadcastSetting
        {
            public Guid PowerSetting;
            public Int32 DataLength;
        }

        // This structure is used when calling CallNtPowerInformation 
        // to retrieve SystemPowerCapabilities
        [StructLayout(LayoutKind.Sequential)]
        public struct SystemPowerCapabilities
        {
            [MarshalAs(UnmanagedType.I1)]
            public bool PowerButtonPresent;
            [MarshalAs(UnmanagedType.I1)]
            public bool SleepButtonPresent;
            [MarshalAs(UnmanagedType.I1)]
            public bool LidPresent;
            [MarshalAs(UnmanagedType.I1)]
            public bool SystemS1;
            [MarshalAs(UnmanagedType.I1)]
            public bool SystemS2;
            [MarshalAs(UnmanagedType.I1)]
            public bool SystemS3;
            [MarshalAs(UnmanagedType.I1)]
            public bool SystemS4;
            [MarshalAs(UnmanagedType.I1)]
            public bool SystemS5;
            [MarshalAs(UnmanagedType.I1)]
            public bool HiberFilePresent;
            [MarshalAs(UnmanagedType.I1)]
            public bool FullWake;
            [MarshalAs(UnmanagedType.I1)]
            public bool VideoDimPresent;
            [MarshalAs(UnmanagedType.I1)]
            public bool ApmPresent;
            [MarshalAs(UnmanagedType.I1)]
            public bool UpsPresent;
            [MarshalAs(UnmanagedType.I1)]
            public bool ThermalControl;
            [MarshalAs(UnmanagedType.I1)]
            public bool ProcessorThrottle;
            public byte ProcessorMinimumThrottle;
            public byte ProcessorMaximumThrottle;
            [MarshalAs(UnmanagedType.I1)]
            public bool FastSystemS4;
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 3)]
            public byte[] spare2;
            [MarshalAs(UnmanagedType.I1)]
            public bool DiskSpinDown;
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 8)]
            public byte[] spare3;
            [MarshalAs(UnmanagedType.I1)]
            public bool SystemBatteriesPresent;
            [MarshalAs(UnmanagedType.I1)]
            public bool BatteriesAreShortTerm;
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 3)]
            public BatteryReportingScale[] BatteryScale;
            public SystemPowerState AcOnlineWake;
            public SystemPowerState SoftLidWake;
            public SystemPowerState RtcWake;
            public SystemPowerState MinimumDeviceWakeState;
            public SystemPowerState DefaultLowLatencyWake;
        }

        public enum PowerInformationLevel
        {
            SystemPowerPolicyAc,
            SystemPowerPolicyDc,
            VerifySystemPolicyAc,
            VerifySystemPolicyDc,
            SystemPowerCapabilities,
            SystemBatteryState,
            SystemPowerStateHandler,
            ProcessorStateHandler,
            SystemPowerPolicyCurrent,
            AdministratorPowerPolicy,
            SystemReserveHiberFile,
            ProcessorInformation,
            SystemPowerInformation,
            ProcessorStateHandler2,
            LastWakeTime,
            LastSleepTime,
            SystemExecutionState,
            SystemPowerStateNotifyHandler,
            ProcessorPowerPolicyAc,
            ProcessorPowerPolicyDc,
            VerifyProcessorPowerPolicyAc,
            VerifyProcessorPowerPolicyDc,
            ProcessorPowerPolicyCurrent,
            SystemPowerStateLogging,
            SystemPowerLoggingEntry,
            SetPowerSettingValue,
            NotifyUserPowerSetting,
            PowerInformationLevelUnused0,
            PowerInformationLevelUnused1,
            SystemVideoState,
            TraceApplicationPowerMessage,
            TraceApplicationPowerMessageEnd,
            ProcessorPerfStates,
            ProcessorIdleStates,
            ProcessorCap,
            SystemWakeSource,
            SystemHiberFileInformation,
            TraceServicePowerMessage,
            ProcessorLoad,
            PowerShutdownNotification,
            MonitorCapabilities,
            SessionPowerInit,
            SessionDisplayState,
            PowerRequestCreate,
            PowerRequestAction,
            GetPowerRequestList,
            ProcessorInformationEx,
            NotifyUserModeLegacyPowerEvent,
            GroupPark,
            ProcessorIdleDomains,
            WakeTimerList,
            SystemHiberFileSize,
            PowerInformationLevelMaximum
        }

        [StructLayout(LayoutKind.Sequential)]
        public struct BatteryReportingScale
        {
            public UInt32 Granularity;
            public UInt32 Capacity;
        }

        public enum SystemPowerState
        {
            Unspecified = 0,
            Working = 1,
            Sleeping1 = 2,
            Sleeping2 = 3,
            Sleeping3 = 4,
            Hibernate = 5,
            Shutdown = 6,
            Maximum = 7
        }

        [StructLayout(LayoutKind.Sequential)]
        public struct SystemBatteryState
        {
            [MarshalAs(UnmanagedType.I1)]
            public bool AcOnLine;
            [MarshalAs(UnmanagedType.I1)]
            public bool BatteryPresent;
            [MarshalAs(UnmanagedType.I1)]
            public bool Charging;
            [MarshalAs(UnmanagedType.I1)]
            public bool Discharging;
            public byte Spare1;
            public byte Spare2;
            public byte Spare3;
            public byte Spare4;
            public uint MaxCapacity;
            public uint RemainingCapacity;
            public uint Rate;
            public uint EstimatedTime;
            public uint DefaultAlert1;
            public uint DefaultAlert2;
        }

        [DllImport("powrprof.dll")]
        internal static extern UInt32 CallNtPowerInformation(
             PowerInformationLevel informationLevel,
             IntPtr inputBuffer,
             UInt32 inputBufferSize,
             out SystemPowerCapabilities outputBuffer,
             UInt32 outputBufferSize
        );

        [DllImport("powrprof.dll")]
        internal static extern UInt32 CallNtPowerInformation(
             PowerInformationLevel informationLevel,
             IntPtr inputBuffer,
             UInt32 inputBufferSize,
             out SystemBatteryState outputBuffer,
             UInt32 outputBufferSize
        );

        /// <summary>
        /// Gets the Guid relating to the currently active power scheme.
        /// </summary>
        /// <param name="rootPowerKey">Reserved for future use, this must be set to IntPtr.Zero</param>
        /// <param name="activePolicy">Returns a Guid referring to the currently active power scheme.</param>
        [DllImport("powrprof.dll")]
        internal static extern void PowerGetActiveScheme(
            IntPtr rootPowerKey,
            [MarshalAs(UnmanagedType.LPStruct)]
            out Guid activePolicy);

        [DllImport("User32", SetLastError = true,
            EntryPoint = "RegisterPowerSettingNotification",
            CallingConvention = CallingConvention.StdCall)]
        internal static extern int RegisterPowerSettingNotification(
                IntPtr hRecipient,
                ref Guid PowerSettingGuid,
                Int32 Flags);

        [DllImport("kernel32.dll", SetLastError = true)]
        internal static extern ExecutionStates SetThreadExecutionState(ExecutionStates esFlags);

        #endregion
    }
}

```

```
using System;

namespace tweetz5.Utilities.PowerManagment
{
    [Flags]
    public enum ExecutionStates
    {
        /// <summary>
        /// No state configured.
        /// </summary>
        None = 0,

        /// <summary>
        /// Forces the system to be in the working state by resetting the system idle timer.
        /// </summary>
        SystemRequired = 0x1,

        /// <summary>
        /// Forces the display to be on by resetting the display idle timer.
        /// </summary>
        DisplayRequired = 0x2,

        /// <summary>
        /// Enables away mode. This value must be specified with ES_CONTINUOUS.
        /// Away mode should be used only by media-recording and media-distribution applications that must perform critical background processing on desktop computers while the computer appears to be sleeping. See Remarks.
        /// 
        /// Windows Server 2003 and Windows XP/2000:  ES_AWAYMODE_REQUIRED is not supported.
        /// </summary>
        AwayModeRequired = 0x40,

        /// <summary>
        /// Informs the system that the state being set should remain in effect until the next call that uses ES_CONTINUOUS and one of the other state flags is cleared.
        /// </summary>
        Continuous = unchecked((int)0x80000000)
    }
}

```

```
using System;
using System.Runtime.InteropServices;
using System.Windows;
using System.Windows.Interop;

namespace tweetz5.Utilities.PowerManagment
{
    internal static class PowerManager
    {
        internal static Guid MonitorPowerStatus = 
            new Guid(0x02731015, 0x4510, 0x4526, 0x99, 0xe6, 0xe5, 0xa1, 0x7e, 0xbd, 0x1a, 0xea);

        public static void RegisterMonitorStatusChange(Window window)
        {
            PowerManagementNativeMethods.RegisterPowerSettingNotification(
                new WindowInteropHelper(window).Handle, ref MonitorPowerStatus, 0);
        }

        public static int MonitorStatus(IntPtr wParam, IntPtr lParam)
        {
            var ps = (PowerManagementNativeMethods.PowerBroadcastSetting)Marshal
                .PtrToStructure(lParam, typeof(PowerManagementNativeMethods.PowerBroadcastSetting));

            var pData = new IntPtr(lParam.ToInt64() + Marshal.SizeOf(ps));
            var monitorStatus = -1;

            if (ps.PowerSetting == MonitorPowerStatus && 
                ps.DataLength == Marshal.SizeOf(typeof(int)))
            {
                monitorStatus = (int)Marshal.PtrToStructure(pData, typeof(int));
            }
            return monitorStatus;
        }
    }
}

```

Register a window by calling `RegisterMonitorStatusChange`. Then override the registerd windows `WndProc` to handle the notificiatons. Here's what tweetz does.

```
private IntPtr WndProc(IntPtr hwnd, int msg, IntPtr wParam, IntPtr lParam, ref bool handled)
      {
          switch (msg)
          {
              case (int)PowerManagementNativeMethods.PowerBroadcastMessage:
                  if ((int)wParam == PowerManagementNativeMethods.PowerSettingChangeMessage)
                  {
                      var monitorStatus = PowerManager.MonitorStatus(wParam, lParam);
                      if (monitorStatus == 0) Timeline.Controller.StopTimelines();
                      if (monitorStatus == 1) Timeline.Controller.StartTimelines();
                  }
                  break;
          }
          return IntPtr.Zero;
      }
```


